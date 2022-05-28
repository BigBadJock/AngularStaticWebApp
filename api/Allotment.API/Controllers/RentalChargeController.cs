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
    [Route("api/RentalCharges")]
    public class RentalChargeController : ControllerBase
    {
        private IRentalChargeService rentalChargeService;
        private ILogger<RentalChargeController> logger;

        public RentalChargeController(IRentalChargeService rentalChargeService, ILogger<RentalChargeController> logger)
        {
            this.rentalChargeService = rentalChargeService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RentalCharge>> Get(Guid id)
        {
            try
            {
                RentalCharge RentalCharge = await this.rentalChargeService.GetById(id);
                return RentalCharge;
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
        public ApiResult<RentalCharge> Get(string restQuery)
        {
            try
            {
                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<RentalCharge> apiResult = this.rentalChargeService.Search(restQuery);
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
        //        [Authorize(Policy ="RentalChargeAdmin")]
        [ClaimMatch("RENTALCHARGE_ADMIN")]
        public async Task<IActionResult> Create(RentalCharge rentalCharge)
        {
            Guard.Against.Null(rentalCharge, nameof(rentalCharge));
            try
            {
                await this.rentalChargeService.Add(rentalCharge);
                return CreatedAtAction(nameof(Get), new { id = rentalCharge.Id }, rentalCharge);
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
        [ClaimMatch("RENTALCHARGE_ADMIN")]
        public async Task<IActionResult> Update(RentalCharge rentalCharge)
        {
            try
            {
                var updated = await this.rentalChargeService.Update(rentalCharge);
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
        [ClaimMatch("RENTALCHARGE_ADMIN")]
        public async Task<IActionResult> Delete(RentalCharge rentalCharge)
        {
            try
            {
                var success = await this.rentalChargeService.Delete(rentalCharge);
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