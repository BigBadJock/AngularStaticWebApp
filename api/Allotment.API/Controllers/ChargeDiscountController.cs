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
    [Route("api/ChargeDiscounts")]
    public class ChargeDiscountController : ControllerBase
    {
        private IChargeDiscountService chargeDiscountService;
        private ILogger<ChargeDiscountController> logger;

        public ChargeDiscountController(IChargeDiscountService chargeDiscountService, ILogger<ChargeDiscountController> logger)
        {
            this.chargeDiscountService = chargeDiscountService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ChargeDiscount>> Get(Guid id)
        {
            try
            {
                ChargeDiscount ChargeDiscount = await this.chargeDiscountService.GetById(id);
                return ChargeDiscount;
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
        public ApiResult<ChargeDiscount> Get(string restQuery)
        {
            try
            {
                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<ChargeDiscount> apiResult = this.chargeDiscountService.Search(restQuery);
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
        [ClaimMatch("CHARGEDISCOUNT_ADMIN")]
        public async Task<IActionResult> Create(ChargeDiscount chargeDiscount)
        {
            Guard.Against.Null(chargeDiscount, nameof(chargeDiscount));
            try
            {
                await this.chargeDiscountService.Add(chargeDiscount);
                return CreatedAtAction(nameof(Get), new { id = chargeDiscount.Id }, chargeDiscount);
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
        [ClaimMatch("CHARGEDISCOUNT_ADMIN")]
        public async Task<IActionResult> Update(ChargeDiscount chargeDiscount)
        {
            try
            {
                var updated = await this.chargeDiscountService.Update(chargeDiscount);
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
        [ClaimMatch("CHARGEDISCOUNT_ADMIN")]
        public async Task<IActionResult> Delete(ChargeDiscount chargeDiscount)
        {
            try
            {
                var success = await this.chargeDiscountService.Delete(chargeDiscount);
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