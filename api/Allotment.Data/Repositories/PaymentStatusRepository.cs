using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class PaymentStatusRepository : BaseRepository<PaymentStatus>, IPaymentStatusRepository
    {

        public PaymentStatusRepository(AllotmentContext dataContext, IRestToLinqParser<PaymentStatus> parser, ILogger<IPaymentStatusRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
