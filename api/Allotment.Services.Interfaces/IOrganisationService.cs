using Allotment.DTOs;
using Allotment.Models;
using Core.Common.Contracts;
using System.Threading.Tasks;

namespace Allotment.Services.Interfaces
{
    public interface IOrganisationService : IDataService<Organisation>
    {
        Task<Organisation> CreateOrganisation(CreateOrganisationDTO organisation);
    }
}
