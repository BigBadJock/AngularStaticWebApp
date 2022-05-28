using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace Allotment.API.AuthorizationAttribute
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ClaimMatchAttribute : TypeFilterAttribute
    {

        public ClaimMatchAttribute(string claim) : base(typeof(ClaimMatchFilter))
        {
            Arguments = new object[] { claim };
        }

    }

    public class ClaimMatchFilter : IAuthorizationFilter
    {
        public ClaimMatchFilter(string claim) => Claim = claim;

        public string Claim { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Guard.Against.Null(context, nameof(context));
            if (!context.HttpContext.User.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
            }
            else
            {
                var foundClaim = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == Claim);
                if (foundClaim is null)
                {
                    context.Result = new UnauthorizedResult();
                }
            }
        }
    }

}
