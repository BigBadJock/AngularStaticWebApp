using Allotment.Data.Interfaces;
using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Allotment.Services
{
    public class OrganisationService : BaseDataService<Organisation>, IOrganisationService
    {

        public OrganisationService(IOrganisationRepository repository, ILogger<Organisation> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }


        public async Task<Organisation> CreateOrganisation(CreateOrganisationDTO organisation)
        {
            try
            {
                IOrganisationRepository rep = (IOrganisationRepository)this.repository;
                Guid orgId = await rep.Create(organisation);
                if (orgId != null)
                {
                    Organisation newOrg = await this.repository.GetById(orgId);
                    return newOrg;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
