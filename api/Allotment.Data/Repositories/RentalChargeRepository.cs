using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class RentalChargeRepository : BaseRepository<RentalCharge>, IRentalChargeRepository
    {
        public RentalChargeRepository(AllotmentContext dataContext, IRestToLinqParser<RentalCharge> parser, ILogger<IRentalChargeRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
