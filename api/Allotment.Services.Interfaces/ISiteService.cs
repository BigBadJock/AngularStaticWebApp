using Allotment.DTOs;
using Allotment.Models;
using Core.Common.Contracts;
using System;

namespace Allotment.Services.Interfaces
{
    public interface ISiteService : IDataService<Site>
    {
        OrganisationStats GetOrganisationStats(Guid organisationId);
    }
}
