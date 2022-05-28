using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class PaymentTypeService : BaseDataService<PaymentType>, IPaymentTypeService
    {

        public PaymentTypeService(IPaymentTypeRepository repository, ILogger<PaymentType> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
