using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class removeplotsfromtenantmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plots_Tenants_TenantId",
                table: "Plots");

            migrationBuilder.DropIndex(
                name: "IX_Plots_TenantId",
                table: "Plots");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Plots");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "Plots",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Plots_TenantId",
                table: "Plots",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plots_Tenants_TenantId",
                table: "Plots",
                column: "TenantId",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
