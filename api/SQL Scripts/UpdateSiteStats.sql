DECLARE @siteId UNIQUEIDENTIFIER;
DECLARE @NoOfPlots INT;
DECLARE @Rented INT;
DECLARE @UnderOffer INT;
DECLARE @Uncultivated INT;
DECLARE @UnpaidPlots INT;
DECLARE @TotalRent MONEY;
DECLARE @PaidRent MONEY;
DECLARE @UnpaidRent MONEY;

SELECT @siteId = 'CC5490A6-CE37-4179-C901-08D86BBD1DB9';

SELECT @NoOfPlots = COUNT(*), 
       @Rented = SUM(CASE
                         WHEN p.IsCurrentlyRented = 1
                         THEN 1
                         ELSE 0
                     END), 
       @UnderOffer = SUM(CASE
                             WHEN p.IsUnderOffer = 1
                             THEN 1
                             ELSE 0
                         END), 
       @Uncultivated = SUM(CASE
                               WHEN p.IsUncultivated = 1
                               THEN 1
                               ELSE 0
                           END)
FROM dbo.Plots p
WHERE p.SiteId = @siteId;

SELECT @TotalRent = SUM(r.Cost), 
       @UnpaidPlots = SUM(CASE
                              WHEN r.PaymentStatusId = '038326EE-159B-494D-498D-08D867E6AA80'
                              THEN 1
                              ELSE 0
                          END), 
       @PaidRent = SUM(CASE
                           WHEN r.PaymentStatusId = '58031226-CC85-4A04-498F-08D867E6AA80'
                           THEN r.cost
                           ELSE 0
                       END), 
       @UnpaidRent = SUM(CASE
                             WHEN r.PaymentStatusId = '038326EE-159B-494D-498D-08D867E6AA80'
                             THEN r.cost
                             ELSE 0
                         END)
FROM Rentals r
     JOIN Plots p ON p.Id = r.PlotId
WHERE p.SiteId = @siteId;

SELECT @TotalRent = CASE WHEN @TotalRent is NULL	THEN 0 ELSE @TotalRent end
SELECT @UnpaidPlots = CASE WHEN @UnpaidPlots is NULL	THEN 0 ELSE @UnpaidPlots end
SELECT @PaidRent = CASE WHEN @PaidRent is NULL	THEN 0 ELSE @PaidRent end
SELECT @UnpaidRent = CASE WHEN @UnpaidRent is NULL	THEN 0 ELSE @UnpaidRent end


SELECT @NoOfPlots AS NoOfPlots, 
       @Rented AS Rented, 
       @UnderOffer AS UnderOffer, 
       @Uncultivated AS Uncultivated, 
       @TotalRent AS TotalRent, 
       @UnpaidPlots AS UnpaidPlots, 
       @PaidRent AS PaidRent, 
       @UnpaidRent AS UnpaidRent;

UPDATE Sites
  SET 
      Sites.NumberOfPlots = @NoOfPlots, 
      sites.UnletPlots = (@NoOfPlots - @Rented), 
      sites.UnpaidPlots = @UnpaidPlots, 
      sites.TotalFees = @TotalRent, 
      sites.UnpaidFees = @UnpaidRent
WHERE sites.Id = @siteId;
SELECT *
FROM sites;

