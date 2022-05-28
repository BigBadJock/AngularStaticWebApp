using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class TenantRepository : BaseRepository<Tenant>, ITenantRepository
    {
        public TenantRepository(AllotmentContext dataContext, IRestToLinqParser<Tenant> parser, ILogger<ITenantRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
