using Allotment.Models;
using Allotment.Services.Interfaces;
using AllotmentFunctions.Helpers;
using Ardalis.GuardClauses;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
using Core.Common;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using REST_Parser.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AllotmentFunctions
{
    [ApiExplorerSettings(GroupName = "Waiting List")]

    public class WaitingListFunctions
    {
        private readonly IWaitingListService WaitingListService;
        private readonly ILogger<WaitingListFunctions> logger;
        private readonly IConfigurationRoot configuration;
        private readonly IAuthorizationService authorizationService;
        private JWTSettings options;

        public WaitingListFunctions(
            IWaitingListService WaitingListService,
            IConfigurationRoot configuration,
            IOptions<JWTSettings> optionsAccessor,
            IAuthorizationService authorizationService,
            ILogger<WaitingListFunctions> logger)
        {
            this.WaitingListService = WaitingListService;
            this.logger = logger;
            this.configuration = configuration;
            this.options = optionsAccessor.Value;
            this.authorizationService = authorizationService;
        }

        [ProducesResponseType(typeof(WaitingListEntry[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetWaitingListsByRestQuery")]
        public ActionResult<List<WaitingListEntry>> GetWaitingListsByRestQuery(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "waitingList/query/{restQuery}")]
            HttpRequest req,
            string restQuery,
            ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "WAITING_LIST_ADMIN");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }

            if (req.Query.Keys.Count > 0)
            {
                restQuery = req.QueryString.ToString();
                restQuery = restQuery.Substring(1);
            }

            if (!auth.IsSuperUser) restQuery += ("&organisationId[eq]=" + auth.OrganisationId);

            ApiResult<WaitingListEntry> apiResult = this.WaitingListService.Search(restQuery);
            return new OkObjectResult(apiResult);

        }

        [ProducesResponseType(typeof(WaitingListEntry), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetWaitingListById")]
        public async Task<ActionResult<WaitingListEntry>> GetWaitingListById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "waitingList/{id}")] HttpRequest req,
            Guid id,
            ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "WAITING_LIST_ADMIN");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }


            log.LogInformation($"Fetching WaitingList for id: {id}");
            WaitingListEntry waitingList = await this.WaitingListService.GetById(id);
            if (waitingList == null)
            {
                return new NotFoundResult();
            }
            if (!auth.IsSuperUser && waitingList.OrganisationId != auth.OrganisationId)
            {
                return new ForbidResult();
            }

            return new OkObjectResult(waitingList);
        }


        [ProducesResponseType(typeof(WaitingListEntry), (int)HttpStatusCode.Created)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("CreateWaitingList")]
        public async Task<ActionResult<WaitingListEntry>> CreateWaitingList(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "waitingList")]
            [RequestBodyType(typeof(WaitingListEntry), "waitingList")] HttpRequest req,
            ILogger log
            )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "WAITING_LIST_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                WaitingListEntry waitingList = JsonConvert.DeserializeObject<WaitingListEntry>(requestBody);

                Guard.Against.Null(waitingList.FirstName, nameof(waitingList.FirstName));
                Guard.Against.Null(waitingList.LastName, nameof(waitingList.LastName));
                Guard.Against.Null(waitingList.Phone, nameof(waitingList.Phone));
                Guard.Against.Null(waitingList.Email, nameof(waitingList.Email));


                if (!auth.IsSuperUser && waitingList.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                log.LogInformation($"Adding new WaitingList Entry");
                WaitingListEntry newOrg = await WaitingListService.Add(waitingList);
                var url = $"/WaitingList/{newOrg.Id}";
                return new CreatedResult(url, newOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


        [ProducesResponseType(typeof(WaitingListEntry), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("UpdateWaitingList")]
        public async Task<ActionResult<WaitingListEntry>> UpdateWaitingList(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "waitingList/{id}")]
            [RequestBodyType(typeof(WaitingListEntry), "waitingList")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "WAITING_LIST_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                WaitingListEntry waitingList = JsonConvert.DeserializeObject<WaitingListEntry>(requestBody);

                if (!auth.IsSuperUser && waitingList.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                WaitingListEntry updatedOrg = await WaitingListService.Update(waitingList);
                return new OkObjectResult(updatedOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [FunctionName("DeleteWaitingList")]
        public async Task<ActionResult<WaitingListEntry>> DeleteWaitingList(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "waitingList")]
             [RequestBodyType(typeof(WaitingListEntry), "waitingList")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "WAITING_LIST_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                WaitingListEntry waitingList = JsonConvert.DeserializeObject<WaitingListEntry>(requestBody);

                if (!auth.IsSuperUser && waitingList.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }
                log.LogInformation($"Delete WaitingList Entry");
                await WaitingListService.Delete(waitingList);
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }
    }
}
