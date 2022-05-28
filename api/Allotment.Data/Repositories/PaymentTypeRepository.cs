using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class PaymentTypeRepository : BaseRepository<PaymentType>, IPaymentTypeRepository
    {
        public PaymentTypeRepository(AllotmentContext dataContext, IRestToLinqParser<PaymentType> parser, ILogger<IPaymentTypeRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
