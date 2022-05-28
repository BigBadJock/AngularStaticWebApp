using Microsoft.EntityFrameworkCore.Migrations;

namespace Allotment.Data.Migrations
{
    public partial class add_CreateSite_storedProc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
Execute('
CREATE OR ALTER PROCEDURE [dbo].[CreateSite]
                          -- Add the parameters for the stored procedure here
                          @organisationId UNIQUEIDENTIFIER
                        , @name           VARCHAR(200)
                        , @noOfPlots      INT
                        , @userId         VARCHAR(200)
                        , @siteId         UNIQUEIDENTIFIER OUTPUT
                        , @message        VARCHAR(200) OUTPUT
AS
    BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

        DECLARE
               @output TABLE
        (
                             [id] UNIQUEIDENTIFIER
        );

        DECLARE
               @count INT;

        DECLARE
               @alreadyExists BIT;

        SELECT
           @alreadyExists = 1
        FROM
             [dbo].[sites] s
        WHERE s.[Name] = @name
              AND s.OrganisationId = @organisationId;

        IF @alreadyExists = 1
            BEGIN
                -- create error message
                SET @message = ''A site with that name already exists'';
                RETURN -2;
            END;

        IF @name IS NULL
           OR @noOfPlots IS NULL
            BEGIN
                -- create error message
                SET @message = ''Site missing required information'';

                RETURN -3;
            END;

        --Insert statements for procedure here
        DECLARE
               @startTrancount INT;

        BEGIN TRY
            SELECT
               @startTrancount = @@TRANCOUNT;
            IF @startTrancount = 0
            BEGIN TRANSACTION;

            INSERT INTO [dbo].[sites]
            (
               [Id]
             , [OrganisationId]
             , [name]
             , [NumberOfPlots]
             , [UnletPlots]
             , [UncultivatedPlots]
             , [UnpaidPlots]
             , [UnpaidFees]
             , [WaitingList]
             , [PlotsUnderOffer]
             , [TotalFees]
             , [created]
             , [LastUpdated]
             , [LastUpdatedBy]
             , [IsDeleted]
            )
            OUTPUT
               INSERTED.[id]
                   INTO @output
            VALUES
            (
                   NEWID()
                 , @organisationId
                 , @name
                 , @noOfPlots
                 , @noOfPlots
                 , @noOfPlots
                 , 0
                 , 0
                 , 0
                 , 0
                 , 0
                 , GETDATE()
                 , GETDATE()
                 , @userId
                 , 0
            );

            SELECT
               @siteId = [id] FROM
                                   @output;

            SET @count = 1;

            WHILE @count <= @noOfPlots
                BEGIN
                    INSERT INTO [dbo].[plots]
                    (
                       [Id]
                     , [OrganisationId]
                     , [SiteId]
                     , [Name]
                     , [IsCurrentlyRented]
                     , [IsUncultivated]
                     , [IsUnderOffer]
                     , [Size]
                     , [created]
                     , [LastUpdated]
                     , [LastUpdatedBy]
                     , [IsDeleted]
                    )
                    VALUES
                    (
                           NEWID()
                         , @organisationId
                         , @siteId
                         , FORMAT(@count, ''000'', ''en-GB'')
                         , 0
                         , 0
                         , 0
                         , 0
                         , GETDATE()
                         , GETDATE()
                         , @userId
                         , 0
                    );

                    SET @count = @count + 1;
                END;

            IF @startTrancount = 0
                COMMIT TRANSACTION;

            SELECT
               @message = ''Success'';
        END TRY
        BEGIN CATCH
            IF @startTrancount = 0
                ROLLBACK TRANSACTION;
            SET @message = ''Error in [createSite]: '' + ERROR_MESSAGE();

            RETURN 51500;
        END CATCH;
    END;
');";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
