
CREATE VIEW vPlotRentalHistory
AS
     SELECT
        r.Id
      , r.Created
      , r.LastUpdated
      , r.LastUpdatedBy
      , r.IsDeleted
      , r.OrganisationId
      , p.id AS PlotId
      , p.Name AS PlotName
      , r.StartDate
      , r.EndDate
      , r.PaymentStatusId
      , ps.Name as PaymentStatus
      , t.Id AS TenantId
      , t.Title
      , t.FirstName
      , t.LastName
      , CAST(IIF(GETDATE() > r.StartDate
               AND GETDATE() < = r.endDate, 1, 0) AS BIT) AS IsCurrent
     FROM
          [allotment].[dbo].[Rentals] r
          LEFT OUTER JOIN Plots p ON p.Id = r.PlotId
          LEFT OUTER JOIN Tenants t ON t.Id = r.TenantId
          LEFT OUTER JOIN PaymentStatus ps ON ps.Id = r.PaymentStatusId;


