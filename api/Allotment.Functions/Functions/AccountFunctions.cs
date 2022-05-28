using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.Interfaces;
using AllotmentFunctions.Helpers;
using Ardalis.GuardClauses;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AllotmentFunctions
{

    [ApiExplorerSettings(GroupName = "Authorization")]

    public class AccountFunctions
    {
        private readonly ILogger<AccountFunctions> logger;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly JWTSettings options;
        private readonly ITokenService tokenService;
        private readonly ISendGridService emailService;
        private readonly SendGridOptions sendGridOptions;
        private readonly IConfiguration configuration;
        private readonly string frontEndRoot;
        private readonly IStringLocalizer<AccountFunctions> localizer;

        public AccountFunctions(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IOptions<JWTSettings> optionsAccessor,
            ITokenService tokenService,
            ISendGridService emailService,
            IOptions<SendGridOptions> sendGridOptions,
            IConfiguration configuration,
            IStringLocalizer<AccountFunctions> localizer,
            ILogger<AccountFunctions> logger)
        {

            Guard.Against.Null(optionsAccessor, nameof(optionsAccessor));
            Guard.Against.Null(sendGridOptions, nameof(sendGridOptions));
            Guard.Against.Null(configuration, nameof(configuration));
            Guard.Against.Null(logger, nameof(logger));
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.options = optionsAccessor.Value;
            this.tokenService = tokenService;
            this.emailService = emailService;
            this.sendGridOptions = sendGridOptions.Value;
            this.configuration = configuration;
            this.localizer = localizer;
            this.logger = logger;

            this.frontEndRoot = this.configuration["FrontEndRoot"];
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [FunctionName("Register")]
        public async Task<IActionResult> PostAsync(
              [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "account/register")]
              [RequestBodyType(typeof(RegistrationCredentials), "credentials")] HttpRequest req,
              ILogger log)
        {
            try
            {

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                RegistrationCredentials credentials = JsonConvert.DeserializeObject<RegistrationCredentials>(requestBody);

                Guard.Against.Null(credentials, nameof(credentials));
                if (credentials.IsValid(validationResults: out var validationResults))
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
                        var host = Environment.GetEnvironmentVariable("WEBSITE_HOSTNAME");
                        var confirmationUrl = $"{host}/api/account/confirmEmail?userId={WebUtility.UrlEncode(user.Id)}&secret={WebUtility.UrlEncode(code)}";

                        if (Environment.GetEnvironmentVariable("HTTPS") == "True")
                        {
                            confirmationUrl = "https://" + confirmationUrl;
                        }
                        else
                        {
                            confirmationUrl = "http://" + confirmationUrl;
                        }

                        dynamic templateData = new ExpandoObject();

                        templateData.userName = user.UserName;
                        templateData.firstName = user.FirstName;
                        templateData.lastName = user.LastName;
                        templateData.userEmail = user.Email;
                        templateData.confirmationUrl = confirmationUrl;

                        await emailService.SendEmailAsync(sendGridOptions.WelcomeEmailTemplateId, user.Email, "Welcome", templateData);

                        return new OkResult();
                    }

                    return new BadRequestObjectResult(result);
                }

                var errors = validationResults.Select(x => x.ErrorMessage)
                    .ToList();

                var json = JsonConvert.SerializeObject(errors);
                return new BadRequestObjectResult(json);
            }
            catch (Exception ex)
            {
                //TODO Log error
                System.Diagnostics.Debug.WriteLine(ex.Message);
                throw;
            }
        }


        [FunctionName("ConfirmEmail")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [QueryStringParameter("userId", "user id", DataType = typeof(string), Required = true)]
        [QueryStringParameter("secret", "secret - sent in email", DataType = typeof(string), Required = true)]
        public async Task<IActionResult> ConfirmEmail(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "account/ConfirmEmail")] HttpRequest req, ILogger log)
        {
            try
            {
                IDictionary<string, string> queryParams = req.GetQueryParameterDictionary();
                string userId = queryParams.ContainsKey("userId") ? queryParams["userId"] : null;
                string code = queryParams.ContainsKey("secret") ? queryParams["secret"] : null;
                Guard.Against.Null(userId, nameof(userId));
                Guard.Against.Null(code, nameof(code));

                var user = await userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    var result = await userManager.ConfirmEmailAsync(user, code);
                    var signInPath = $"{this.frontEndRoot}signin";
                    return new RedirectResult(signInPath);
                }

                return new BadRequestObjectResult(this.localizer["UserNotFound"]);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }

        }



        [FunctionName("SignIn")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> SignIn(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "account/SignIn")]
            [RequestBodyType(typeof(Credentials), "credentials")] HttpRequest req, ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                logger.LogTrace($"SignIn: requestBody =[{requestBody}]");

                Credentials credentials = JsonConvert.DeserializeObject<Credentials>(requestBody);

                Guard.Against.Null(credentials, nameof(credentials));
                if (credentials.IsValid(validationResults: out var validationResults))
                {
                    logger.LogTrace("Credentials are valid");
                    var foundUser = this.userManager.FindByEmailAsync(credentials.Email).Result;
                    if (foundUser != null)
                    {
                        logger.LogTrace("User found");

                        var result = this.signInManager.PasswordSignInAsync(foundUser, credentials.Password, false, true).Result;

                        if (result == Microsoft.AspNetCore.Identity.SignInResult.Success)
                        {
                            logger.LogTrace("SignIn Success");

                            string accessToken = await tokenService.BuildAccessToken(foundUser);

                            logger.LogTrace($"accessToken: [{accessToken}]");
                            string refreshToken = await this.tokenService.GenerateRefreshToken(foundUser);
                            logger.LogTrace($"refreshToken: [{refreshToken}]");

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

                            dynamic returnValue = new ExpandoObject();
                            returnValue.user = userDTO;

                            return new OkObjectResult(returnValue);
                        }
                        else if (result.IsLockedOut)
                        {
                            return new BadRequestObjectResult(this.localizer["AccountIsLocked"]);
                        }
                        else if (result.IsNotAllowed && !foundUser.EmailConfirmed)
                        {
                            return new BadRequestObjectResult(this.localizer["EmailHasNotBeenConfirmed"]);
                        }
                        else
                        {
                            return new BadRequestObjectResult(this.localizer["InvalidEmailOrPassword"]);
                        }
                    }
                    return new BadRequestObjectResult(this.localizer["InvalidEmailOrPassword"]);
                }
                return new BadRequestObjectResult(this.localizer["InvalidEmailOrPassword"]);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                throw;
            }
        }

        [FunctionName("SignOut")]
        public async Task<IActionResult> SignOut(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "account/SignOut")] HttpRequest req, ILogger log)
        {
            await this.signInManager.SignOutAsync();
            return new OkResult();
        }

        [FunctionName("RefreshAccessToken")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> RefreshAccessToken(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "account/RefreshAccessToken")]
            [RequestBodyType(typeof(RefreshTokenCredentials), "credentials")] HttpRequest req, ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            RefreshTokenCredentials credentials = JsonConvert.DeserializeObject<RefreshTokenCredentials>(requestBody);

            Guard.Against.Null(credentials, nameof(credentials));
            try
            {
                var foundUser = this.userManager.FindByEmailAsync(credentials.UserName).Result;
                string accessToken = await this.tokenService.RefreshAccessToken(credentials.UserName, credentials.RefreshToken);
                string refreshToken = string.Empty;
                if (!string.IsNullOrWhiteSpace(accessToken))
                {
                    // If it hasn't generated a new access token, then clear the refresh token too
                    refreshToken = await this.tokenService.GenerateRefreshToken(foundUser);
                }

                return new OkObjectResult(new { accessToken, refreshToken });
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [FunctionName("ForgottenPasswordRequest")]
        public async Task<IActionResult> ForgottenPasswordRequest(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "account/ForgottenPasswordRequest/{userEmail}")] HttpRequest req, string userEmail, ILogger log)
        {
            //IDictionary<string, string> queryParams = req.GetQueryParameterDictionary();
            //string userEmail = queryParams.ContainsKey("userEmail") ? queryParams["userEmail"] : null;

            Guard.Against.NullOrWhiteSpace(userEmail, nameof(userEmail));
            var user = await userManager.FindByEmailAsync(userEmail);
            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResetUrl = $"{this.frontEndRoot}resetpassword/?email={WebUtility.UrlEncode(user.Email)}&code={WebUtility.UrlEncode(token)}";

                dynamic templateData = new ExpandoObject();

                templateData.userName = user.UserName;
                templateData.userEmail = user.Email;
                templateData.passwordResetUrl = passwordResetUrl;

                await emailService.SendEmailAsync(sendGridOptions.ForgottenEmailTemplateId, user.Email, "Password Reset", templateData);

                return new OkResult();
            }

            return new NotFoundResult();
        }

        [FunctionName("ResetPassword")]
        public async Task<IActionResult> ResetPassword(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "account/ResetPassword")]
            [RequestBodyType(typeof(ResetPasswordCredentials), "credentials")] HttpRequest req, ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            ResetPasswordCredentials credentials = JsonConvert.DeserializeObject<ResetPasswordCredentials>(requestBody);

            Guard.Against.Null(credentials, nameof(credentials));

            var user = await userManager.FindByEmailAsync(credentials.UserEmail);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, credentials.ResetPasswordToken, credentials.Password);
                if (result.Succeeded)
                {
                    return new OkResult();
                }

            }
            string message = this.localizer["ProblemUpdatingPassword"];
            return new BadRequestObjectResult(message);
        }


    }
}
