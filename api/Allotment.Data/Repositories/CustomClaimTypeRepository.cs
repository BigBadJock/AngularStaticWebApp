using Allotment.Data.Infrastructure;
using Core.Common;
using Core.Common.Contracts;
using Core.Common.DataModels;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class CustomClaimTypeRepository : BaseRepository<CustomClaimType>, ICustomClaimTypeRepository
    {

        public CustomClaimTypeRepository(AllotmentContext dataContext, IRestToLinqParser<CustomClaimType> parser, ILogger<ICustomClaimTypeRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
