using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class updateSiteStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
Execute('
CREATE PROCEDURE dbo.UpdateSiteStats @organisationId UNIQUEIDENTIFIER, 
                                     @siteId UNIQUEIDENTIFIER
AS
     DECLARE @sitePlots INT;
            DECLARE @currentlyRented INT;
            DECLARE @underOffer INT;
            DECLARE @uncultivated INT;

            SELECT @sitePlots = COUNT(*),
                   @currentlyRented = SUM(IIF(p.IsCurrentlyRented = 1, 1, 0)),
                   @underOffer = SUM(IIF(p.isUnderOffer = 1, 1, 0)),
                   @uncultivated = SUM(IIF(p.IsUncultivated = 1, 1, 0))
     FROM[Plots] p
    WHERE p.OrganisationId = @organisationId
           AND p.SiteId = @siteId
           AND p.IsDeleted = 0
     GROUP BY p.OrganisationId, 
              p.SiteId;

            UPDATE sites
       SET
           NumberOfPlots = @sitePlots,
           PlotsUnderOffer = @underOffer,
           UncultivatedPlots = @uncultivated
     WHERE id = @siteId;
            RETURN 0;
');";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
