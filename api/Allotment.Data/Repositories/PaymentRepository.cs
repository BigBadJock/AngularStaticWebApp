using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
    {

        public PaymentRepository(AllotmentContext dataContext, IRestToLinqParser<Payment> parser, ILogger<IPaymentRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
