using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class updateorganisationsettingstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
DROP TABLE organisationSettings;

DROP TABLE settingValues;

DROP TABLE settings;

SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.Organisations ADD
	Settings nvarchar(MAX) NULL
GO
ALTER TABLE dbo.Organisations SET (LOCK_ESCALATION = TABLE)
GO
COMMIT



            ";
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
