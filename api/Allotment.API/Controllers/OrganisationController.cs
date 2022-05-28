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
using System.Collections.Generic;
using System.Net.Mime;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Allotment.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Organisations")]
    public class OrganisationController : ControllerBase
    {
        private readonly IAuthorizationService authorizationService;
        private readonly IOrganisationService organisationService;
        private readonly ILogger<OrganisationController> logger;

        public OrganisationController(IAuthorizationService authorizationService, IOrganisationService organisationService, ILogger<OrganisationController> logger)
        {
            this.authorizationService = authorizationService;
            this.organisationService = organisationService;
            this.logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Organisation>> Get(Guid id)
        {
            try
            {
                var authorizationResult =
                await authorizationService.AuthorizeAsync(User, id, "OrganisationAllowed").ConfigureAwait(false);

                if (authorizationResult.Succeeded)
                {
                    this.logger.LogInformation($"Fetching Organisation for id: {id}");
                    Organisation organisation = await this.organisationService.GetById(id);
                    if (organisation == null)
                    {
                        return new NotFoundResult();
                    }


                    return organisation;
                }
                return new ForbidResult();
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }

        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<List<Organisation>> Get(string restQuery)
        {
            try
            {
                Claim claim = this.Request.HttpContext.User.FindFirst("ORGANISATION");
                if (claim == null) return new UnauthorizedResult();

                restQuery += "&id=" + claim.Value;

                this.logger.LogInformation(string.Format("rest query recieved {0}", restQuery));
                ApiResult<Organisation> apiResult = this.organisationService.Search(restQuery);
                return Ok(apiResult);
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
        //        [Authorize(Policy ="OrganisationAdmin")]
        [ClaimMatch("ORGANISATION_ADMIN")]
        public async Task<IActionResult> Create(Organisation organisation)
        {
            Guard.Against.Null(organisation, nameof(organisation));
            try
            {
                await this.organisationService.Add(organisation);
                return CreatedAtAction(nameof(Get), new { id = organisation.Id }, organisation);
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
        [ClaimMatch("ORGANISATION_ADMIN")]
        public async Task<IActionResult> Update(Organisation organisation)
        {
            try
            {
                Claim claim = this.Request.HttpContext.User.FindFirst("ORGANISATION");
                if (claim == null) return new UnauthorizedResult();

                var updated = await this.organisationService.Update(organisation);
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
        [ClaimMatch("ORGANISATION_ADMIN")]
        public async Task<IActionResult> Delete(Organisation organisation)
        {
            try
            {
                var success = await this.organisationService.Delete(organisation);
                return Ok(success);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message, ex);
                throw;
            }
        }

        //[HttpPost]
        //[Route("Execute")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> ExecuteSP(string name)
        //{
        //    try
        //    {
        //        int result = await this.organisationService.ExecuteTest(name);
        //        if (result != -1) return Ok(result);
        //        return BadRequest();
        //    }
        //    catch (Exception ex)
        //    {
        //        this.logger.LogError(ex.Message, ex);
        //        throw ex;
        //    }
        //}
    }

}