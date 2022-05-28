using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.DTOs;
using Allotment.Models;
using Core.Common;
using Microsoft.Data.SqlClient;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using REST_Parser;
using System;
using System.Data;
using System.Threading.Tasks;

namespace Allotment.Data.Repositories
{
    public class OrganisationRepository : BaseRepository<Organisation>, IOrganisationRepository
    {
        public OrganisationRepository(AllotmentContext dataContext, IRestToLinqParser<Organisation> parser, ILogger<IOrganisationRepository> logger) : base(dataContext, parser, logger)
        {
        }

        public async Task<Guid> Create(CreateOrganisationDTO entity)
        {
            try
            {

                SqlParameter[] parameters = new SqlParameter[14];
                parameters[0] = new SqlParameter("@organisationName", SqlDbType.VarChar, 200) { Value = entity.OrganisationName };
                parameters[1] = new SqlParameter("@addressLine1", SqlDbType.VarChar, 200) { Value = entity.Address1 };
                parameters[2] = new SqlParameter("@addressLine2", SqlDbType.VarChar, 200) { Value = entity.Address2 };
                parameters[3] = new SqlParameter("@addressLine3", SqlDbType.VarChar, 200) { Value = entity.Address3 };
                parameters[4] = new SqlParameter("@addressLine4", SqlDbType.VarChar, 200) { Value = entity.Address4 };
                parameters[5] = new SqlParameter("@locality", SqlDbType.VarChar, 200) { Value = entity.Locality };
                parameters[6] = new SqlParameter("@townOrCity", SqlDbType.VarChar, 200) { Value = entity.TownOrCity };
                parameters[7] = new SqlParameter("@county", SqlDbType.VarChar, 200) { Value = entity.County };
                parameters[8] = new SqlParameter("@country", SqlDbType.VarChar, 200) { Value = entity.Country };
                parameters[9] = new SqlParameter("@postCode", SqlDbType.VarChar, 200) { Value = entity.PostCode };
                parameters[10] = new SqlParameter("@usersEmail", SqlDbType.VarChar, 200) { Value = entity.UsersEmail };
                parameters[11] = new SqlParameter("@organisationId", SqlDbType.UniqueIdentifier) { Direction = ParameterDirection.Output };
                parameters[12] = new SqlParameter("@message", SqlDbType.VarChar, 200) { Direction = ParameterDirection.Output };
                parameters[13] = new SqlParameter("@return", SqlDbType.Int) { Direction = ParameterDirection.ReturnValue };

                var command = dataContext.Database.GetDbConnection().CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "createOrganisation";
                command.Parameters.AddRange(parameters);
                command.Connection.Open();

                try
                {
                    await command.ExecuteNonQueryAsync();
                    int result = (int)command.Parameters["@return"].Value;
                    if (result == 0)
                    {
                        Guid orgId = (Guid)command.Parameters["@organisationId"].Value;
                        return orgId;
                    }
                    else
                    {
                        throw new Exception("Could not CreateOrganisation");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
