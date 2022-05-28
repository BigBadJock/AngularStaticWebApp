using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class TenantService : BaseDataService<Tenant>, ITenantService
    {

        public TenantService(ITenantRepository repository, ILogger<Tenant> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
