create view [dbo].[vPlotsWithRentals]
as
select p.*, t.FirstName, t.LastName, cr.StartDate, cr.EndDate,  cr.PaymentStatusId, ps.Name as PaymentStatus
  from Plots p
left join ( select OrganisationId, PlotId, TenantId, StartDate, EndDate, r.PaymentStatusId
  from Rentals r
 where StartDate < getdate()
   and EndDate > getdate()
) cr on cr.PlotId = p.id
left join Tenants t on t.Id = p.TenantId
left join PaymentStatus ps on ps.Id = cr.PaymentStatusId

go