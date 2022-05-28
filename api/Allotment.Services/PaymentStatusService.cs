using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class PaymentStatusService : BaseDataService<PaymentStatus>, IPaymentStatusService
    {

        public PaymentStatusService(IPaymentStatusRepository repository, ILogger<PaymentStatus> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
