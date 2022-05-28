using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Microsoft.Data.SqlClient;

using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Threading.Tasks;

namespace Allotment.Data.StoredProcs
{
    public class TestStoredProc : ITestStoredProc
    {
        private AllotmentContext context;

        public TestStoredProc(AllotmentContext context)
        {
            this.context = context;
        }

        public async Task<int> ExecuteSP(string name)
        {
            SqlParameter[] parameters = new SqlParameter[2];
            parameters[0] = new SqlParameter("@name", SqlDbType.VarChar, 100) { Value = name };
            var output = new SqlParameter("@length", SqlDbType.Int);
            output.Direction = ParameterDirection.Output;
            parameters[1] = output;
            
            var command = context.Database.GetDbConnection().CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "TestProc";
            command.Parameters.AddRange(parameters);



            if (command.Connection.State != ConnectionState.Open)
            {
                command.Connection.Open();
            }

            try
            {
                await command.ExecuteNonQueryAsync();
                int result = (int)command.Parameters["@length"].Value;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
    }
}
