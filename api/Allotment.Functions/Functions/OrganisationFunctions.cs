using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.Interfaces;
using AllotmentFunctions.Helpers;
using Ardalis.GuardClauses;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;


namespace AllotmentFunctions
{
    [ApiExplorerSettings(GroupName = "Organisation")]
    public class OrganisationFunctions
    {
        private readonly UserManager<User> userManager;
        private readonly IOrganisationService organisationService;
        private readonly ISiteService siteService;
        private readonly ILogger<OrganisationFunctions> logger;
        private readonly IConfigurationRoot configuration;
        private readonly IConfigurationRefresher configurationRefresher;
        private readonly IAuthorizationService authorizationService;
        private JWTSettings options;

        public OrganisationFunctions(
            UserManager<User> userManager,
            IOrganisationService organisationService,
            ISiteService siteService,
            IConfigurationRoot configuration,
            IConfigurationRefresherProvider refresherProvider,
            IOptions<JWTSettings> optionsAccessor,
            IAuthorizationService authorizationService,
            ILogger<OrganisationFunctions> logger)
        {
            if (optionsAccessor is null)
            {
                throw new ArgumentNullException(nameof(optionsAccessor));
            }

            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.organisationService = organisationService ?? throw new ArgumentNullException(nameof(organisationService));
            this.siteService = siteService ?? throw new ArgumentNullException(nameof(siteService));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            this.options = optionsAccessor.Value;
            this.authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));

            Guard.Against.Null(refresherProvider, nameof(refresherProvider));


            this.configurationRefresher = refresherProvider.Refreshers.First();
        }

        [ProducesResponseType(typeof(Organisation[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetOrganistationsByRestQuery")]
        public ActionResult<List<Organisation>> GetOrganistationsByRestQuery(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "organisations/{restQuery}")]
            HttpRequest req,
            string restQuery)
        {
            logger.LogInformation("C# HTTP trigger function processed a request.");


            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "ORGANISATION");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }

            if (req.Query.Keys.Count > 0)
            {
                restQuery = req.QueryString.ToString();
                restQuery = restQuery.Substring(1);
            }
            if (!auth.IsSuperUser) restQuery += "&id=" + auth.OrganisationId;


            ApiResult<Organisation> apiResult = this.organisationService.Search(restQuery);
            return new OkObjectResult(apiResult);

        }

        [FunctionName("GetOrganisationById")]
        [ProducesResponseType(typeof(Organisation), 200)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<Organisation>> GetOrganisationById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "organisation/{id}")] HttpRequest req,
            string id, ILogger log)
        {
            log.LogInformation("Refreshing Configuration");
            await configurationRefresher.TryRefreshAsync();


            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "ORGANISATION");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }
            Guid guidId = Guid.Parse(id);

            if (auth.OrganisationId == guidId || auth.IsSuperUser)
            {
                log.LogInformation($"Fetching Organisation for id: {id}");
                Organisation organisation = await this.organisationService.GetById(guidId);
                if (organisation == null)
                {
                    return new NotFoundResult();
                }

                return new OkObjectResult(organisation);
            }
            return new ForbidResult();
        }


        [FunctionName("GetOrganisationStats")]
        [ProducesResponseType(typeof(Organisation), 200)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public ActionResult<OrganisationStats> GetOrganisationStats(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "organisation/stats/{id}")] HttpRequest req,
        string id, ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "ORGANISATION");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }

            Guid guidId = Guid.Parse(id);
            if (guidId == Guid.Empty)
            {
                return new NotFoundResult();
            }


            if (auth.OrganisationId == guidId || auth.IsSuperUser)
            {
                log.LogInformation($"Fetching Organisation stats for id: {id}");
                OrganisationStats stats = this.siteService.GetOrganisationStats(guidId);
                if (stats == null)
                {
                    return new NotFoundResult();
                }

                return new OkObjectResult(stats);
            }
            return new ForbidResult();
        }



        [FunctionName("CreateOrganisation")]
        [ProducesResponseType(typeof(Organisation), (int)HttpStatusCode.Created)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<Organisation>> CreateOrganisation(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "organisation")]
            [RequestBodyType(typeof(CreateOrganisationDTO), "organisation")] HttpRequest req,
            ILogger log
            )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration);
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string email = auth.UserEmail;
                var foundUser = this.userManager.FindByEmailAsync(email).Result;

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                CreateOrganisationDTO organisation = JsonConvert.DeserializeObject<CreateOrganisationDTO>(requestBody);

                Guard.Against.Null(organisation.OrganisationName, nameof(organisation.OrganisationName));

                organisation.UsersEmail = email;
                log.LogInformation($"Adding new organisation: {organisation.OrganisationName}");
                Organisation newOrg = await organisationService.CreateOrganisation(organisation);

                if (newOrg != null)
                {
                    foundUser.OrganisationId = newOrg.Id;
                    await userManager.UpdateAsync(foundUser);
                }



                var url = $"/organisation/{newOrg.Id}";
                return new CreatedResult(url, newOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


        [FunctionName("UpdateOrganisation")]
        [ProducesResponseType(typeof(Organisation), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<Organisation>> UpdateOrganisation(
            [HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "organisation")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "ORGANISATION");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Organisation organisation = JsonConvert.DeserializeObject<Organisation>(requestBody);

                if (auth.OrganisationId != organisation.Id && !auth.IsSuperUser)
                {
                    return new ForbidResult();
                }

                Guard.Against.Null(organisation.Name, nameof(organisation.Name));

                log.LogInformation($"update organisation: {organisation.Name}");
                Organisation updatedOrg = await organisationService.Update(organisation);
                return new OkObjectResult(updatedOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [FunctionName("DeleteOrganisation")]
        [ProducesResponseType(typeof(Organisation), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<ActionResult<Organisation>> DeleteOrganisation(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "organisation")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "ORGANISATION");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Organisation organisation = JsonConvert.DeserializeObject<Organisation>(requestBody);

                if (auth.OrganisationId != organisation.Id && !auth.IsSuperUser)
                {
                    return new ForbidResult();
                }

                Guard.Against.Null(organisation.Name, nameof(organisation.Name));

                log.LogInformation($"Delete organisation: {organisation.Name}");
                await organisationService.Delete(organisation);
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
