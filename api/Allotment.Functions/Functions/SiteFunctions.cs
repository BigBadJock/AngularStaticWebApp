using Allotment.Models;
using Allotment.Services.Interfaces;
using AllotmentFunctions.Helpers;
using Ardalis.GuardClauses;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Core.Common;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using REST_Parser.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AllotmentFunctions
{
    [ApiExplorerSettings(GroupName = "Site")]

    public class SiteFunctions
    {
        private readonly UserManager<User> userManager;
        private readonly ISiteService SiteService;
        private readonly ILogger<SiteFunctions> logger;
        private readonly IConfigurationRoot configuration;
        private readonly IAuthorizationService authorizationService;
        private JWTSettings options;

        public SiteFunctions(
            UserManager<User> userManager,
            ISiteService SiteService,
            IConfigurationRoot configuration,
            IOptions<JWTSettings> optionsAccessor,
            IAuthorizationService authorizationService,
            ILogger<SiteFunctions> logger)
        {
            this.userManager = userManager;
            this.SiteService = SiteService;
            this.logger = logger;
            this.configuration = configuration;
            this.options = optionsAccessor.Value;
            this.authorizationService = authorizationService;
        }

        [ProducesResponseType(typeof(Site[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetSitesByRestQuery")]
        public ActionResult<List<Site>> GetSitesByRestQuery(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "site/query/{restQuery}")]
            HttpRequest req,
            string restQuery,
            ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "SITE_ADMIN");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }

            restQuery += ("&organisationId=" + auth.OrganisationId);

            ApiResult<Site> apiResult = this.SiteService.Search(restQuery);
            return new OkObjectResult(apiResult);

        }

        [ProducesResponseType(typeof(Site), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetSiteById")]
        public async Task<ActionResult<Site>> GetSiteById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "site/{id}")] HttpRequest req,
            string id,
            ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "SITE_ADMIN");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }

            Guid guidId = Guid.Parse(id);

            log.LogInformation($"Fetching Site for id: {id}");
            Site site = await this.SiteService.GetById(guidId);
            if (site == null)
            {
                return new NotFoundResult();
            }

            if (!auth.IsSuperUser && site.OrganisationId != auth.OrganisationId)
            {
                return new ForbidResult();
            }

            return new OkObjectResult(site);
        }

        [ProducesResponseType(typeof(Site), (int)HttpStatusCode.Created)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("CreateSite")]
        public async Task<ActionResult<Site>> CreateSite(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "site")]
            [RequestBodyType(typeof(Site), "site")] HttpRequest req,
            ILogger log
            )
        {

            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "SITE_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Site site = JsonConvert.DeserializeObject<Site>(requestBody);

                Guard.Against.Null(site.Name, nameof(site.Name));

                string email = auth.UserEmail;
                var foundUser = this.userManager.FindByEmailAsync(email).Result;
                site.OrganisationId = auth.OrganisationId;
                site.LastUpdatedBy = foundUser.Id;


                log.LogInformation($"Adding new Site: {site.Name}");
                Site newSite = await SiteService.Add(site);
                var url = $"/Site/{newSite.Id}";
                return new CreatedResult(url, newSite);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


        [ProducesResponseType(typeof(Site), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("UpdateSite")]
        public async Task<ActionResult<Site>> UpdateSite(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "site/{id}")]
            [RequestBodyType(typeof(Site), "site")] HttpRequest req,
            string id,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "SITE_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                dynamic updateObj = JsonConvert.DeserializeObject(requestBody);
                dynamic changes = updateObj.changes;

                Site site = JsonConvert.DeserializeObject<Site>(JsonConvert.SerializeObject(changes));

                Guard.Against.Null(site.Name, nameof(site.Name));

                if (!auth.IsSuperUser && site.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                log.LogInformation($"update Site: {site.Name}");
                Site updatedOrg = await SiteService.Update(site);
                return new OkObjectResult(updatedOrg);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                dynamic problemDetail = new ExpandoObject();
                problemDetail.Type = "BadRequest";
                problemDetail.Title = "This was a bad request";
                problemDetail.Detail = ex.Message;
                problemDetail.Instance = $"/site/{id}";
                string output = JsonConvert.SerializeObject(problemDetail);


                return new BadRequestObjectResult(output);
            }
        }

        [ProducesResponseType(typeof(Site), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("DeleteSite")]
        public async Task<ActionResult<Site>> DeleteSite(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "site")]
            [RequestBodyType(typeof(Site), "site")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "SITE_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Site Site = JsonConvert.DeserializeObject<Site>(requestBody);

                Guard.Against.Null(Site.Name, nameof(Site.Name));

                if (!auth.IsSuperUser && Site.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                log.LogInformation($"Delete Site: {Site.Name}");
                await SiteService.Delete(Site);
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
