using Allotment.API.Email;
using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Ardalis.GuardClauses;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;

namespace Allotment.API.Controllers
{

    /// <summary>
    /// Account Controller
    /// </summary>
    [Route("api")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly JWTSettings options;
        private ITokenService tokenService;
        private ISendGridService emailService;
        private SendGridOptions sendGridOptions;
        private readonly IConfiguration configuration;
        private string frontEndRoot;
        private IStringLocalizer<AccountController> localizer;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IOptions<JWTSettings> optionsAccessor,
            ITokenService tokenService,
            ISendGridService emailService,
            IOptions<SendGridOptions> sendGridOptions,
            IConfiguration configuration,
            IStringLocalizer<AccountController> localizer
        )
        {
            Guard.Against.Null(optionsAccessor, nameof(optionsAccessor));
            Guard.Against.Null(sendGridOptions, nameof(sendGridOptions));
            Guard.Against.Null(configuration, nameof(configuration));
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.options = optionsAccessor.Value;
            this.tokenService = tokenService;
            this.emailService = emailService;
            this.sendGridOptions = sendGridOptions.Value;
            this.configuration = configuration;
            this.localizer = localizer;

            this.frontEndRoot = this.configuration["FrontEndRoot"];


        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Register")]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<IActionResult> Register([FromBody] RegistrationCredentials credentials)
        {
            Guard.Against.Null(credentials, nameof(credentials));
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new User
                    {
                        UserName = credentials.Email,
                        FirstName = credentials.FirstName,
                        LastName = credentials.LastName,
                        Email = credentials.Email,
                    };

                    var result = await userManager.CreateAsync(user, credentials.Password);
                    if (result.Succeeded)
                    {
                        var code = await userManager.GenerateEmailConfirmationTokenAsync(user);

                        var confirmationUrl = Url.Action(nameof(ConfirmEmail), "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);

                        dynamic templateData = new ExpandoObject();

                        templateData.userName = user.UserName;
                        templateData.firstName = user.FirstName;
                        templateData.lastName = user.LastName;
                        templateData.userEmail = user.Email;
                        templateData.confirmationUrl = confirmationUrl;

                        await emailService.SendEmailAsync(sendGridOptions.WelcomeEmailTemplateId, user.Email, "Welcome", templateData);

                        return Ok();
                    }

                    return Errors(result);
                }

                var errors = ModelState.Select(x => x.Value.Errors)
                    .Where(y => y.Count > 0)
                    .ToList();

                var json = JsonConvert.SerializeObject(errors);
                return Error(json);
            }
            catch (Exception ex)
            {
                //TODO Log error
                System.Diagnostics.Debug.WriteLine(ex.Message);
                throw;
            }
        }

        [HttpPost]
        [Route("SignIn")]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<IActionResult> SignIn([FromBody] Credentials credentials)
        {
            Guard.Against.Null(credentials, nameof(credentials));

            var user = new User { Email = credentials.Email, PasswordHash = credentials.Password };
            var foundUser = this.userManager.FindByEmailAsync(credentials.Email).Result;
            if (foundUser != null)
            {
                var result = this.signInManager.PasswordSignInAsync(foundUser, credentials.Password, false, true).Result;

                if (result == Microsoft.AspNetCore.Identity.SignInResult.Success)
                {
                    string accessToken = await tokenService.BuildAccessToken(foundUser);
                    string refreshToken = await this.tokenService.GenerateRefreshToken(foundUser);

                    UserDTO userDTO = new UserDTO
                    {
                        UserName = foundUser.UserName,
                        Email = foundUser.Email,
                        FirstName = foundUser.FirstName,
                        LastName = foundUser.LastName,
                        OrganisationId = foundUser.OrganisationId,
                        AccessToken = accessToken,
                        RefreshToken = refreshToken
                    };

                    return Json(new { user = userDTO });
                }
                else if (result.IsLockedOut)
                {
                    return Error(this.localizer["AccountIsLocked"]);
                }
                else if (result.IsNotAllowed && !foundUser.EmailConfirmed)
                {
                    return Error(this.localizer["EmailHasNotBeenConfirmed"]);
                }
                else
                {
                    return Error(this.localizer["InvalidEmailOrPassword"]);
                }
            }
            return Error(this.localizer["InvalidEmailOrPassword"]);
        }

        [HttpPost]
        [Route("SignOut")]
        public async Task<IActionResult> SignOut()
        {
            await this.signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost]
        [Route("RefreshAccessToken")]
        public async Task<IActionResult> RefreshAccessToken([FromBody] RefreshTokenCredentials credentials)
        {
            Guard.Against.Null(credentials, nameof(credentials));
            try
            {
                var foundUser = this.userManager.FindByEmailAsync(credentials.UserName).Result;
                string accessToken = await this.tokenService.RefreshAccessToken(credentials.UserName, credentials.RefreshToken);
                string refreshToken = string.Empty;
                if (!string.IsNullOrWhiteSpace(accessToken))
                {
                    refreshToken = await this.tokenService.GenerateRefreshToken(foundUser);
                }
                return Json(new { accessToken, refreshToken });
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var result = await userManager.ConfirmEmailAsync(user, code);
                return Redirect($"{this.frontEndRoot}/signin");
            }
            return Error(this.localizer["UserNotFound"]);
        }

        [HttpGet]
        [Route("ForgottenPasswordRequest")]
        public async Task<IActionResult> ForgottenPasswordRequest(string userEmail)
        {
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResetUrl = $"{this.frontEndRoot}resetpassword/?email={HttpUtility.UrlEncode(user.Email)}&code={HttpUtility.UrlEncode(token)}";

                dynamic templateData = new ExpandoObject();

                templateData.userName = user.UserName;
                templateData.userEmail = user.Email;
                templateData.passwordResetUrl = passwordResetUrl;

                await emailService.SendEmailAsync(sendGridOptions.ForgottenEmailTemplateId, user.Email, "Password Reset", templateData);

                return Ok(true);
            }

            return NotFound();

        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCredentials credentials)
        {
            Guard.Against.Null(credentials, nameof(credentials));

            var user = await userManager.FindByEmailAsync(credentials.UserEmail);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, credentials.ResetPasswordToken, credentials.Password);
                if (result.Succeeded)
                {
                    return Ok(true);
                }

            }
            return Error(this.localizer["ProblemUpdatingPassword"]);
        }


        private static JsonResult Errors(IdentityResult result)
        {
            var items = result.Errors
                    .Select(x => x.Description)
                    .ToArray();
            return new JsonResult(items) { StatusCode = 400 };
        }

        private static JsonResult Error(string message)
        {
            return new JsonResult(message) { StatusCode = 400 };
        }

    }
}
