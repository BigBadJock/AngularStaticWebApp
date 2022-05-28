using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class update_vPlotsWithRentals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
execute('
	CREATE OR ALTER   VIEW [dbo].[vPlotsWithRentals]
	 AS
			SELECT
				p.*
			 , t.id AS TenantId
			 , t.FirstName
			 , t.LastName
			 , cr.StartDate
			 , cr.EndDate
			 , cr.PaymentStatusId
			 , ps.Name AS PaymentStatus
			FROM
				  Plots p
				  LEFT JOIN
			(
				 SELECT
					 OrganisationId
				  , PlotId
				  , TenantId
				  , StartDate
				  , EndDate
				  , r.PaymentStatusId
				 FROM
						Rentals r
			where StartDate < getdate()
			and EndDate > getdate()
			) cr ON cr.PlotId = p.id
				  LEFT JOIN Tenants t ON t.Id = cr.TenantId
				  LEFT JOIN PaymentStatus ps ON ps.Id = cr.PaymentStatusId;
');";

            migrationBuilder.Sql(sql);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
