using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class ChargeDiscountService : BaseDataService<ChargeDiscount>, IChargeDiscountService
    {

        public ChargeDiscountService(IChargeDiscountRepository repository, ILogger<ChargeDiscount> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
