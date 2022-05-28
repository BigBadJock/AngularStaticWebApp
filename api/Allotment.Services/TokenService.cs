using Allotment.Models;
using Allotment.Services.Interfaces;
using Ardalis.GuardClauses;
using Core.Common.Contracts;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Allotment.Services
{
    public class TokenService : ITokenService
    {
        private ILogger<ITokenService> logger;
        protected UserManager<User> userManager;
        protected SignInManager<User> signInManager;
        protected JWTSettings options;
        protected IRefreshTokenRepository refreshTokenRepository;

        public TokenService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IOptions<JWTSettings> optionsAccessor,
            IRefreshTokenRepository refreshTokenRepository,
            ILogger<ITokenService> logger
            )
        {
            if (optionsAccessor is null)
            {
                throw new ArgumentNullException(nameof(optionsAccessor));
            }

            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            this.options = optionsAccessor.Value;
            this.refreshTokenRepository = refreshTokenRepository ?? throw new ArgumentNullException(nameof(refreshTokenRepository));
            Guard.Against.NullOrWhiteSpace(options.Issuer, nameof(options.Issuer));
            Guard.Against.NullOrWhiteSpace(options.Audience, nameof(options.Audience));
            Guard.Against.NullOrWhiteSpace(options.SecretKey, nameof(options.SecretKey));
            Guard.Against.Null(options.ExpiryMinutes, nameof(options.ExpiryMinutes));
        }

        public async Task<string> BuildAccessToken(User user)
        {
            logger.LogInformation($"BuildAccessToken() Build AccessToken for {user.Email}");

            var secret = options.SecretKey;

            var claims = (await userManager.GetClaimsAsync(user));


            var claimIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
            });


            logger.LogTrace($"BuildAccessToken() Build Claims");
            foreach (Claim claim in claims)
            {
                try
                {
                    logger.LogTrace($"BuildAccessToken() add claim {claim.Value}");
                    claimIdentity.AddClaim(claim);
                    logger.LogInformation($"added claim {claim.ToString()}");
                }
                catch (Exception)
                {
                    logger.LogError($"BuildAccessToken() error adding claim {claim}");
                }
            }


            logger.LogTrace($"BuildAccessToken(): options.Issuer={options.Issuer}");
            logger.LogTrace($"BuildAccessToken(): options.Audience={options.Audience}");
            logger.LogTrace($"BuildAccessToken(): expires={DateTime.Now.AddMinutes(options.ExpiryMinutes)}");
            logger.LogTrace($"BuildAccessToken(): options.SecretKey={options.SecretKey}");

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: options.Issuer,
                audience: options.Audience,
                expires: DateTime.Now.AddMinutes(options.ExpiryMinutes),
                claims: claimIdentity.Claims,

                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.SecretKey)),
                    SecurityAlgorithms.HmacSha256
                )
            );

            logger.LogInformation("BuildAccessToken() Token Created");
            var handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(token);
        }

        public async Task<string> GenerateRefreshToken(User user)
        {
            Guid refreshTokenGuid = Guid.NewGuid();
            RefreshToken newToken = new RefreshToken
            {
                UserId = user.Id,
                Token = refreshTokenGuid,
                Expiry = DateTime.Now.AddMinutes(this.options.RefreshTokenExpiryMinutes)
            };

            RefreshToken existingToken = this.refreshTokenRepository.GetAll().Where(x => x.UserId == user.Id).FirstOrDefault();
            if (existingToken != null)
            {
                await refreshTokenRepository.Delete(existingToken);
            }
            await refreshTokenRepository.Add(newToken);

            return refreshTokenGuid.ToString();
        }

        public async Task<string> RefreshAccessToken(string userName, string refreshTokenString)
        {
            string accessToken = string.Empty;

            User user = await this.userManager.FindByEmailAsync(userName);
            if (user != null)
            {
                RefreshToken token = this.refreshTokenRepository.GetAll().Where(x => x.UserId == user.Id).FirstOrDefault();
                if (token != null)
                {
                    if (token.Token.ToString().Equals(refreshTokenString))
                    {
                        if (token.Expiry > DateTime.Now)
                        {
                            accessToken = await this.BuildAccessToken(user);
                        }
                    }
                }
            }

            return accessToken;
        }

        public bool ValidateToken(string accessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();
            tokenHandler.ValidateToken(accessToken, validationParameters, out _);
            return true;
        }

        private TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidIssuer = this.options.Issuer,
                ValidAudience = this.options.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.SecretKey))
            };
        }
    }
}
