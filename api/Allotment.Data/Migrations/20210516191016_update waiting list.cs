using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class updatewaitinglist : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWaiting",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "OfferDate",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "PlotId",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "SiteId",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "UnderOffer",
                table: "WaitingList");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine2",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine3",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine4",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostCode",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sites",
                table: "WaitingList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "WaitingList",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "AddressLine2",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "AddressLine3",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "AddressLine4",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "PostCode",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "Sites",
                table: "WaitingList");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "WaitingList");

            migrationBuilder.AddColumn<bool>(
                name: "IsWaiting",
                table: "WaitingList",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "OfferDate",
                table: "WaitingList",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "PlotId",
                table: "WaitingList",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SiteId",
                table: "WaitingList",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "WaitingList",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "WaitingList",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "UnderOffer",
                table: "WaitingList",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
