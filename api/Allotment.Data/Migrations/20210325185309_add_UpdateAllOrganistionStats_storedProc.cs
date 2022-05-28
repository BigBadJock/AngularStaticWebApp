using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class add_UpdateAllOrganistionStats_storedProc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
Execute('
ALTER PROCEDURE [dbo].[UpdateAllOrganisationStats]
AS
    BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

        DECLARE
               @organisationId UNIQUEIDENTIFIER;
        DECLARE
               @return_value INT;

        DECLARE organisationCursor CURSOR
        FOR SELECT
               id
            FROM
                 organisations o
            WHERE o.IsDeleted = 0;

        OPEN organisationCursor;

        FETCH NEXT FROM organisationCursor INTO
                                                @organisationId;

        WHILE @@FETCH_STATUS = 0
            BEGIN
                EXEC @return_value = [dbo].[UpdateOrganisationStats]
                     @organisationId = @organisationId;
                FETCH NEXT FROM organisationCursor INTO
                                                        @organisationId;
            END;

        CLOSE organisationCursor;
        DEALLOCATE organisationCursor;

        RETURN @return_value;
    END;
');";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
