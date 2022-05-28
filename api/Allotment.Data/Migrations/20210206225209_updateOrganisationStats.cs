using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class updateOrganisationStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
Execute('
CREATE OR ALTER PROCEDURE dbo.UpdateOrganisationStats @organisationId UNIQUEIDENTIFIER
AS
     DECLARE @siteId UNIQUEIDENTIFIER;
     DECLARE @return_value INT;

     DECLARE siteCursor CURSOR
     FOR SELECT id
         FROM sites s
         WHERE s.OrganisationId = @organisationId;

     OPEN siteCursor;

     FETCH NEXT FROM siteCursor INTO @siteId;

     WHILE @@FETCH_STATUS = 0
         BEGIN
             EXEC @return_value = [dbo].[UpdateSiteStats] 
                  @organisationId = @organisationId, 
                  @siteId = @siteId;
             FETCH NEXT FROM siteCursor INTO @siteId;
         END;

     CLOSE siteCursor;
     DEALLOCATE siteCursor;

     RETURN @return_value;
');";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
