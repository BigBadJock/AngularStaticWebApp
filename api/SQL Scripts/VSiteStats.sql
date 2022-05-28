USE [Allotment]
GO
/****** Object:  View [dbo].[vSiteStats]    Script Date: 02/10/2020 23:58:23 ******/

IF EXISTS(SELECT 1 FROM sys.views 
     WHERE Name = 'vSiteStats')
    BEGIN
		DROP VIEW [dbo].[vSiteStats]
	END
GO

/****** Object:  View [dbo].[vSiteStats]    Script Date: 02/10/2020 23:58:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW		[dbo].[vSiteStats]
as
SELECT organisationId, 
	count(*) AS Sites, 
	sum(dbo.sites.NumberOfPlots) AS NumberOfPlots,
	sum(dbo.sites.UnletPlots) AS UnletPlots,
	sum(dbo.sites.PlotsUnderOffer) AS PlotsUnderOffer,
	sum(dbo.sites.uncultivatedPlots) AS UncultivatedPlots,
	sum(dbo.sites.UnpaidPlots) AS UnpaidPlots, 
	sum(dbo.sites.TotalFees) as TotalFees,
	sum(dbo.sites.UnpaidFees) AS UnpaidFees
  FROM sites
GROUP BY OrganisationId
GO
