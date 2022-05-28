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
    [Route("api/Tenants")]
    public class TenantController : ControllerBase
    {
        private ITenantService tenantService;
        private ILogger<TenantController> logger;

        public TenantController(ITenantService tenantService, ILogger<TenantController> logger)
        {
            this.tenantService = tenantService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Tenant>> Get(Guid id)
        {
            try
            {
                Tenant tenant = await this.tenantService.GetById(id);
                return tenant;
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
        public ApiResult<Tenant> Get(string restQuery)
        {
            try
            {
                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<Tenant> apiResult = this.tenantService.Search(restQuery);
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
        [ClaimMatch("TENANT_ADMIN")]
        public async Task<IActionResult> Create(Tenant tenant)
        {
            Guard.Against.Null(tenant, nameof(tenant));
            try
            {
                await this.tenantService.Add(tenant);
                return CreatedAtAction(nameof(Get), new { id = tenant.Id }, tenant);
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
        [ClaimMatch("TENANT_ADMIN")]
        public async Task<IActionResult> Update(Tenant tenant)
        {
            try
            {
                var updated = await this.tenantService.Update(tenant);
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
        [ClaimMatch("TENANT_ADMIN")]
        public async Task<IActionResult> Delete(Tenant tenant)
        {
            try
            {
                var success = await this.tenantService.Delete(tenant);
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