using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
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
    public class SiteRepository : BaseRepository<Site>, ISiteRepository
    {
        public SiteRepository(AllotmentContext dataContext, IRestToLinqParser<Site> parser, ILogger<ISiteRepository> logger) : base(dataContext, parser, logger)
        {
        }

        public override async Task<Site> Add(Site entity)
        {
            this.logger.LogInformation($"Adding new Site: {entity.Name} to organisation: {entity.OrganisationId} ");
            try
            {
                SqlParameter[] parameters = new SqlParameter[7];
                parameters[0] = new SqlParameter("@organisationId", SqlDbType.UniqueIdentifier) { Value = entity.OrganisationId };
                parameters[1] = new SqlParameter("@name", SqlDbType.VarChar, 200) { Value = entity.Name };
                parameters[2] = new SqlParameter("@noOfPlots", SqlDbType.Int) { Value = entity.NumberOfPlots };
                parameters[3] = new SqlParameter("@userId", SqlDbType.VarChar, 200) { Value = entity.LastUpdatedBy };
                parameters[4] = new SqlParameter("@siteId", SqlDbType.UniqueIdentifier) { Direction = ParameterDirection.Output };
                parameters[5] = new SqlParameter("@message", SqlDbType.VarChar, 200) { Direction = ParameterDirection.Output };
                parameters[6] = new SqlParameter("@return", SqlDbType.Int) { Direction = ParameterDirection.ReturnValue };

                var command = dataContext.Database.GetDbConnection().CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "createSite";
                command.Parameters.AddRange(parameters);
                command.Connection.Open();

                await command.ExecuteNonQueryAsync();
                int result = (int)command.Parameters["@return"].Value;
                if (result == 0)
                {
                    Guid siteId = (Guid)command.Parameters["@siteId"].Value;

                    Site newSite = await this.GetById(siteId, false);

                    this.logger.LogInformation($"New site Added");

                    return newSite;

                }
                else
                {
                    throw new Exception("Could not Create Site");
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Could not create new site: {entity.Name} because: {ex.Message}");
                throw ex;
            }

        }
    }
}
