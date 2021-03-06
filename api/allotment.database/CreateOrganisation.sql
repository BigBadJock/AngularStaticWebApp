USE [Allotment]
GO
/****** Object:  StoredProcedure [dbo].[createOrganisation]    Script Date: 14/03/2021 22:42:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		John McArthur
-- Create date: 11/02/2021
-- Description:	Create an organisation, add to user, add user claims
-- =============================================

ALTER PROCEDURE [dbo].[createOrganisation]
                -- Add the parameters for the stored procedure here
                @organisationName VARCHAR(200)
              , @addressLine1     VARCHAR(200)
              , @addressLine2     VARCHAR(200)     = NULL
              , @addressLine3     VARCHAR(200)     = NULL
              , @addressLine4     VARCHAR(200)     = NULL
              , @locality         VARCHAR(200)     = NULL
              , @townOrCity       VARCHAR(200)
              , @county           VARCHAR(200)     = NULL
              , @country          VARCHAR(200)     = NULL
              , @postCode         VARCHAR(200)
              , @usersEmail       VARCHAR(200)
				  , @message			 VARCHAR(200) OUTPUT 
              , @organisationId   UNIQUEIDENTIFIER OUTPUT
AS
    BEGIN
        DECLARE
               @userId UNIQUEIDENTIFIER;
        DECLARE
               @alreadyExists BIT;

        SELECT
           @userId = u.Id
        FROM
             [dbo].[AspNetUsers] u
        WHERE u.Email = @usersEmail;

        IF @userId IS NULL
            BEGIN
                -- create error message
                SET @message = 'User cannot be found';
                RETURN -1;
            END;

        SELECT
           @alreadyExists = 1
        FROM
             [dbo].[Organisations] o
        WHERE o.[Name] = @organisationName;
        IF @alreadyExists = 1
            BEGIN
                -- create error message
                SET @message =
                'An organisation with that name already exists';
                RETURN -2;
            END;

        IF @organisationName IS NULL
           OR @addressLine1 IS NULL
           OR @townOrCity IS NULL
           OR @postCode IS NULL
            BEGIN
                -- create error message
                SET @message = 'organisation missing required information'
                ;

                RETURN -3;
            END;

        DECLARE
               @startTrancount INT;

        BEGIN TRY
            SELECT
               @startTrancount = @@TRANCOUNT;
            IF @startTrancount = 0
            BEGIN TRANSACTION;

            INSERT INTO [dbo].[Organisations]
            (
               [id]
             , [Name]
             , [AddressLine1]
             , [AddressLine2]
             , [AddressLine3]
             , [AddressLine4]
             , [Locality]
             , [TownOrCity]
             , [County]
             , [Country]
             , [PostCode]
             , [created]
             , [LastUpdated]
             , [LastUpdatedBy]
             , [IsDeleted]
            )
            VALUES
            (
                   NEWID()
                 , @organisationName
                 , @addressLine1
                 , @addressLine2
                 , @addressLine3
                 , @addressLine4
                 , @locality
                 , @townOrCity
                 , @county
                 , @country
                 , @postCode
                 , GETDATE()
                 , GETDATE()
                 , @userId
                 , 0
            );

            SELECT
               @organisationId = [id]
            FROM
                 Organisations o
            WHERE o.[Name] = @organisationName;

            UPDATE [dbo].[AspNetUsers]
              SET
                  [OrganisationId] = @organisationId
            WHERE
               id = @userId;

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'ADMINISTRATOR'
                 , 'ADMINISTRATOR'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'ORGANISATION_ADMIN'
                 , 'ORGANISATION_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'ORGANISATION_SETTING_ADMIN'
                 , 'ORGANISATION_SETTING_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'PAYMENT_ADMIN'
                 , 'PAYMENT_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'PLOT_ADMIN'
                 , 'PLOT_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'RENTAL_ADMIN'
                 , 'RENTAL_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'SITE_ADMIN'
                 , 'SITE_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'WAITING_LIST_ADMIN'
                 , 'WAITING_LIST_ADMIN'
            );

            INSERT INTO [dbo].[AspNetUserClaims]
            (
               UserId
             , ClaimType
             , ClaimValue
            )
            VALUES
            (
                   @userId
                 , 'ORGANISATION'
                 , @organisationId
            );

            IF @startTrancount = 0
                COMMIT TRANSACTION;

            SELECT
               @message = 'Success';
        END TRY
        BEGIN CATCH
            IF @startTrancount = 0
                ROLLBACK TRANSACTION;
            SET @message = 'Error in [createOrganisation]: ' +
            ERROR_MESSAGE();

            RETURN 51500;
        END CATCH;

    END;
