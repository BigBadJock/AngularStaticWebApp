USE [Allotment]
GO
/****** Object:  StoredProcedure [dbo].[UpdateSiteStats]    Script Date: 14/03/2021 22:43:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateSiteStats] @organisationId UNIQUEIDENTIFIER, 
                                     @siteId         UNIQUEIDENTIFIER
AS
     DECLARE @sitePlots INT;
     DECLARE @unletPlots INT;
     DECLARE @underOffer INT;
     DECLARE @uncultivated INT;

     SELECT @sitePlots = COUNT(*), 
            @unletPlots = SUM(IIF(p.IsCurrentlyRented = 1, 0, 1)), 
            @underOffer = SUM(IIF(p.isUnderOffer = 1, 1, 0)), 
            @uncultivated = SUM(IIF(p.IsUncultivated = 1, 1, 0))
     FROM [Plots] p
     WHERE p.OrganisationId = @organisationId
           AND p.SiteId = @siteId
           AND p.IsDeleted = 0
     GROUP BY p.OrganisationId, 
              p.SiteId;

     UPDATE sites
       SET 
           NumberOfPlots = @sitePlots, 
           PlotsUnderOffer = @underOffer, 
           UncultivatedPlots = @uncultivated,
		   UnletPlots = @unletPlots
     WHERE id = @siteId;
     RETURN 0;