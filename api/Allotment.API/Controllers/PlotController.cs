using Allotment.API.AuthorizationAttribute;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Ardalis.GuardClauses;
using Core.Common;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using REST_Parser.Models;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Allotment.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Plots")]
    public class PlotController : ControllerBase
    {
        private IPlotService plotService;
        private ILogger<PlotController> logger;

        public PlotController(IPlotService plotService, ILogger<PlotController> logger)
        {
            this.plotService = plotService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Plot>> Get(Guid id)
        {
            try
            {
                Plot Plot = await this.plotService.GetById(id);
                return Plot;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ApiResult<Plot> Get(string restQuery)
        {
            try
            {
                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<Plot> apiResult = this.plotService.Search(restQuery);
                return apiResult;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }

        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //        [Authorize(Policy ="PlotAdmin")]
        [ClaimMatch("PLOT_ADMIN")]
        public async Task<IActionResult> Create(Plot plot)
        {
            Guard.Against.Null(plot, nameof(plot));

            try
            {
                await this.plotService.Add(plot);
                return CreatedAtAction(nameof(Get), new { id = plot.Id }, plot);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }
        }

        [HttpPatch]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ClaimMatch("PLOT_ADMIN")]
        public async Task<IActionResult> Update(Plot plot)
        {
            try
            {
                var updated = await this.plotService.Update(plot);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }
        }

        [HttpDelete]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ClaimMatch("PLOT_ADMIN")]
        public async Task<IActionResult> Delete(Plot plot)
        {
            try
            {
                var success = await this.plotService.Delete(plot);
                return Ok(success);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }

}