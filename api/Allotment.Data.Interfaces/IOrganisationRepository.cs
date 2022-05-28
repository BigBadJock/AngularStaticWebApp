using Allotment.DTOs;
using Allotment.Models;
using Core.Common.Contracts;
using System;
using System.Threading.Tasks;

namespace Allotment.Data.Interfaces
{
    public interface IOrganisationRepository : IRepository<Organisation>
    {
        Task<Guid> Create(CreateOrganisationDTO entity);
    }
}
