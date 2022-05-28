using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Globalization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AllotmentFunctions.AuthorizationAttribute
{
    /// <summary>
    /// OrganisationAuthorizationHandler - limits the user retrieving information to only the organisation allowed by the token
    /// </summary>
    public class OrganisationAuthorizationHandler : AuthorizationHandler<OrganisationAllowedRequirement, Guid>
    {

        /// <summary>
        /// Checks if a user has a claim allowing them to see the organisation 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="requirement"></param>
        /// <param name="organisationId"></param>
        /// <returns></returns>
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            OrganisationAllowedRequirement requirement,
            Guid organisationId)
        {
            Guard.Against.Null(context, "context");
            System.Diagnostics.Debug.WriteLine(string.Format("OrganisationId: {0}", organisationId));

            Claim claim = context.User.FindFirst("ORGANISATION");
            if (claim != null)
            {
                System.Diagnostics.Debug.WriteLine(string.Format("claim found: {0}", claim.Value));
                if (claim.Value == organisationId.ToString().ToUpper(CultureInfo.InvariantCulture))
                {
                    System.Diagnostics.Debug.WriteLine(string.Format("claim success"));
                    context.Succeed(requirement);
                }
            }
            return Task.CompletedTask;
        }


    }
    /// <summary>
    /// OrganisationAllowedRequirement
    /// </summary>
    public class OrganisationAllowedRequirement : IAuthorizationRequirement
    { }
}
