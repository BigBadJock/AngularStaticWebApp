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
    [Route("api/WaitingList")]
    public class WaitingListController : ControllerBase
    {
        private IWaitingListService waitingListService;
        private ILogger<WaitingListController> logger;

        public WaitingListController(IWaitingListService waitingListService, ILogger<WaitingListController> logger)
        {
            this.waitingListService = waitingListService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<WaitingListEntry>> Get(Guid id)
        {
            try
            {
                WaitingListEntry WaitingList = await this.waitingListService.GetById(id);
                return WaitingList;
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
        public ApiResult<WaitingListEntry> Get(string restQuery)
        {
            try
            {
                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<WaitingListEntry> apiResult = this.waitingListService.Search(restQuery);
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
        //        [Authorize(Policy ="WaitingListAdmin")]
        [ClaimMatch("WAITINGLIST_ADMIN")]
        public async Task<IActionResult> Create(WaitingListEntry waitingList)
        {
            Guard.Against.Null(waitingList, nameof(waitingList));

            try
            {
                await this.waitingListService.Add(waitingList);
                return CreatedAtAction(nameof(Get), new { id = waitingList.Id }, waitingList);
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
        [ClaimMatch("WAITINGLIST_ADMIN")]
        public async Task<IActionResult> Update(WaitingListEntry waitingList)
        {
            try
            {
                var updated = await this.waitingListService.Update(waitingList);
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
        [ClaimMatch("WAITINGLIST_ADMIN")]
        public async Task<IActionResult> Delete(WaitingListEntry setting)
        {
            try
            {
                var success = await this.waitingListService.Delete(setting);
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