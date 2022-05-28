using Allotment.Models;
using Allotment.Services.Interfaces;
using AllotmentFunctions.Helpers;
using Ardalis.GuardClauses;
using AzureFunctions.Extensions.Swashbuckle.Attribute;
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
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace AllotmentFunctions
{
    [ApiExplorerSettings(GroupName = "Plot")]

    public class PlotFunctions
    {
        private readonly IPlotService PlotService;
        private readonly ILogger<PlotFunctions> logger;
        private readonly IConfigurationRoot configuration;
        private readonly IAuthorizationService authorizationService;
        private readonly JWTSettings options;

        public PlotFunctions(
            IPlotService PlotService,
            IConfigurationRoot configuration,
            IOptions<JWTSettings> optionsAccessor,
            IAuthorizationService authorizationService,
            ILogger<PlotFunctions> logger)
        {
            this.PlotService = PlotService;
            this.logger = logger;
            this.configuration = configuration;
            this.options = optionsAccessor.Value;
            this.authorizationService = authorizationService;
        }

        [ProducesResponseType(typeof(Plot[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetPlotsByRestQuery")]
        public ActionResult<List<Plot>> GetPlotsByRestQuery(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "plots/{restQuery}")]
            HttpRequest req,
            string restQuery,
            ILogger log)
        {
            log.LogInformation("GetPlotsByRestQuery()");
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");

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

            try
            {
                ApiResult<Plot> apiResult = this.PlotService.Search(restQuery);
                return new OkObjectResult(apiResult);

            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw;
            }


        }

        [ProducesResponseType(typeof(PlotsWithRentalsView[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetPlotsWithRentalsByRestQuery")]
        public ActionResult<List<PlotsWithRentalsView>> GetPlotsWithRentalsByRestQuery(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "plotsWithRentals/{restQuery}")]
            HttpRequest req, string restQuery, ILogger log)
        {
            try
            {
                AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");

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

                ApiResult<PlotsWithRentalsView> apiResult = this.PlotService.GetPlotsWithRentals(restQuery);
                return new OkObjectResult(apiResult);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                throw;
            }

        }

        [ProducesResponseType(typeof(Plot), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetPlotById")]
        public async Task<ActionResult<Plot>> GetPlotById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "plot/{id}")] HttpRequest req,
            Guid id,
            ILogger log)
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");

            if (!auth.IsValid)
            {
                return new UnauthorizedResult(); // No authentication info.
            }


            log.LogInformation($"Fetching Plot for id: {id}");
            Plot plot = await this.PlotService.GetById(id);
            if (plot == null)
            {
                return new NotFoundResult();
            }
            if (!auth.IsSuperUser && plot.OrganisationId != auth.OrganisationId)
            {
                return new ForbidResult();
            }

            return new OkObjectResult(plot);
        }


        [ProducesResponseType(typeof(Plot), (int)HttpStatusCode.Created)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("CreatePlot")]
        public async Task<ActionResult<Plot>> CreatePlot(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "plot")]
            [RequestBodyType(typeof(Plot), "plot")] HttpRequest req,
            ILogger log
            )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Plot plot = JsonConvert.DeserializeObject<Plot>(requestBody);

                Guard.Against.Null(plot.Name, nameof(plot.Name));

                if (!auth.IsSuperUser && plot.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                log.LogInformation($"Adding new Plot: {plot.Name}");
                Plot newOrg = await PlotService.Add(plot);
                var url = $"/Plot/{newOrg.Id}";
                return new CreatedResult(url, newOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }


        [ProducesResponseType(typeof(Plot), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("UpdatePlot")]
        public async Task<ActionResult<Plot>> UpdatePlot(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "plot/{id}")]
            [RequestBodyType(typeof(Plot), "plot")] HttpRequest req,
            string id,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Plot plot = JsonConvert.DeserializeObject<Plot>(requestBody);

                Guard.Against.Null(plot.Name, nameof(plot.Name));
                if (!auth.IsSuperUser && plot.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }

                log.LogInformation($"update Plot: {plot.Name}");
                Plot updatedOrg = await PlotService.Update(plot);
                return new OkObjectResult(updatedOrg);
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [FunctionName("DeletePlot")]
        public async Task<ActionResult<Plot>> DeletePlot(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "plot")]
             [RequestBodyType(typeof(Plot), "plot")] HttpRequest req,
            ILogger log
        )
        {
            AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");
            if (!auth.IsValid)
            {
                return new UnauthorizedResult();
            }
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Plot plot = JsonConvert.DeserializeObject<Plot>(requestBody);

                if (!auth.IsSuperUser && plot.OrganisationId != auth.OrganisationId)
                {
                    return new ForbidResult();
                }
                log.LogInformation($"Delete Plot: {plot.Name}");
                await PlotService.Delete(plot);
                return new OkResult();
            }
            catch (Exception)
            {
                return new BadRequestResult();
            }
        }

        [ProducesResponseType(typeof(PlotRentalHistoryView[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [FunctionName("GetPlotRentalHistory")]
        public ActionResult<List<PlotRentalHistoryView>> GetPlotRentalHistoryByRestQuery(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "plotRentalHistory/query/{restQuery}")]
            HttpRequest req, string restQuery, ILogger log)
        {
            try
            {
                AuthenticationInfo auth = new AuthenticationInfo(req, this.options, this.configuration, "PLOT_ADMIN");

                if (!auth.IsValid)
                {
                    return new UnauthorizedResult(); // No authentication info.
                }

                restQuery += ("&organisationId=" + auth.OrganisationId);

                ApiResult<PlotRentalHistoryView> apiResult = this.PlotService.GetPlotRentalHistory(restQuery);
                return new OkObjectResult(apiResult);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                throw;
            }

        }


    }
}
