USE [Allotment]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrganisationStats]    Script Date: 14/03/2021 22:42:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[UpdateOrganisationStats] @organisationId UNIQUEIDENTIFIER
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