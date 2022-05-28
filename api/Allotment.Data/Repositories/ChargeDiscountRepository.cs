using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class ChargeDiscountRepository : BaseRepository<ChargeDiscount>, IChargeDiscountRepository
    {

        public ChargeDiscountRepository(AllotmentContext dataContext, IRestToLinqParser<ChargeDiscount> parser, ILogger<IChargeDiscountRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
