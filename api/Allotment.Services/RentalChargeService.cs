using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class RentalChargeService : BaseDataService<RentalCharge>, IRentalChargeService
    {

        public RentalChargeService(IRentalChargeRepository repository, ILogger<RentalCharge> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
