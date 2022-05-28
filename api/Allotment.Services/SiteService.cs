using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using System.Linq;
using Allotment.DTOs;

namespace Allotment.Services
{
    public class SiteService : BaseDataService<Site>, ISiteService
    {

        public SiteService(ISiteRepository repository, ILogger<Site> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }


        public OrganisationStats GetOrganisationStats(Guid organisationId)
        {
            try
            {
                var allSites = this.repository.GetAll();
                var stats = allSites
                    .GroupBy(s => s.OrganisationId)
                    .Select(s2 => new OrganisationStats
                    {
                        OrganisationId = s2.Key,
                        NoOfSites = s2.Count(),
                        NoOfPlots = s2.Sum(p => p.NumberOfPlots),
                        UnletPlots = s2.Sum(p => p.UnletPlots),
                        UncultivatedPlots = s2.Sum(p => p.UncultivatedPlots),
                        WaitingList = s2.Sum(p => p.WaitingList)
                    });


                OrganisationStats result = null;
                int c = stats.Count();
                if (c > 0)
                {
                    result = stats.Where(s => s.OrganisationId == organisationId).First();
                }
                return result;
            } catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return new OrganisationStats();
            }
        }
    }
}
