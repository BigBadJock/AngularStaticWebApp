using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Dynamic;
using System.Linq;

namespace Allotment.Data.Infrastructure
{
    public class AllotmentDbInitialiser : IDbInitializer
    {
        private readonly IServiceScopeFactory serviceScopeFactory;

        public AllotmentDbInitialiser(IServiceScopeFactory serviceScopeFactory)
        {
            this.serviceScopeFactory = serviceScopeFactory;
        }

        public void Initialize()
        {
            using (var serviceScope = this.serviceScopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<AllotmentContext>())
                {
                    context.Database.EnsureCreated();
                    context.Database.Migrate();
                }
            }
        }

        public void SeedData()
        {
            using (var serviceScope = this.serviceScopeFactory.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<AllotmentContext>())
                {
                    if (!context.CustomClaimsTypes.Any())
                    {
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "SUPERUSER" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "ADMINISTRATOR" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "CHARGEDISCOUNT_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "ORGANISATION_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "ORGANISATION_SETTING_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "PAYMENT_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "PAYMENT_STATUS_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "PAYMENT_TYPE_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "PLOT_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "RENTAL_CHARGE_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "RENTAL_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "SETTING_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "SETTING_VALUE_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "SITE_ADMIN" });
                        context.CustomClaimsTypes.Add(new CustomClaimType { Name = "WAITING_LIST_ADMIN" });
                        context.SaveChanges();

                        context.PaymentType.Add(new PaymentType { Name = "Cash" });
                        context.PaymentType.Add(new PaymentType { Name = "Cheque" });
                        PaymentType pt = new PaymentType { Name = "Bank Transfer" };
                        context.PaymentType.Add(pt);
                        context.PaymentType.Add(new PaymentType { Name = "PayPal" });

                        context.PaymentStatus.Add(new PaymentStatus { Name = "Unpaid" });
                        context.PaymentStatus.Add(new PaymentStatus { Name = "Partial Payment" });

                        PaymentStatus psPaid = new PaymentStatus { Name = "Paid" };
                        context.PaymentStatus.Add(psPaid);
                        context.SaveChanges();

                        dynamic settings = new ExpandoObject();
                        settings.Measurement = "Rods";

                        string s = JsonConvert.SerializeObject(settings);

                        Organisation org = new Organisation { Name = "Brentwood Horticultural Society", AddressLine1 = "1 High Street", TownOrCity = "Brentwood", County = "Essex", PostCode = "CM14 1TT", Country = "United Kingdom", LastUpdatedBy = "System" };
                        context.Organisations.Add(org);
                        context.SaveChanges();

                        ChargeDiscount cdRental = new ChargeDiscount { OrganisationId = org.Id, Name = "Rental", ChargeOrDiscount = ChargeDiscount.ChargeDiscountType.Charge, Amount = 4.5m, IsMultipleOfPlotSize = true };
                        ChargeDiscount cdMembership = new ChargeDiscount { OrganisationId = org.Id, Name = "Membership", ChargeOrDiscount = ChargeDiscount.ChargeDiscountType.Charge, Amount = 6m };
                        ChargeDiscount cdOAPDiscount = new ChargeDiscount { OrganisationId = org.Id, Name = "Pensioner Discount", ChargeOrDiscount = ChargeDiscount.ChargeDiscountType.Discount, Amount = 10m, IsPercentage = true };

                        context.ChargeDiscounts.Add(cdRental);
                        context.ChargeDiscounts.Add(cdMembership);
                        context.ChargeDiscounts.Add(cdOAPDiscount);
                        context.SaveChanges();

                        Site hartswood = new Site { Name = "Hartswood", OrganisationId = org.Id };

                        context.Sites.Add(hartswood);
                        context.SaveChanges();

                        Tenant c = new Tenant { OrganisationId = org.Id, FirstName = "Bob", LastName = "Smith" };
                        context.Tenants.Add(c);
                        context.SaveChanges();

                        Plot plot1 = new Plot { Name = "1A", Size = 9, SiteId = hartswood.Id, OrganisationId = org.Id, IsCurrentlyRented = true, IsUncultivated = false };
                        Plot plot2 = new Plot { Name = "1B", Size = 5, SiteId = hartswood.Id, OrganisationId = org.Id, IsUncultivated = true };

                        context.Plots.Add(plot1);
                        context.Plots.Add(plot2);

                        for (int i = 3; i < 175; i++)
                        {
                            Plot plot = new Plot { Name = i.ToString(), Size = 9, SiteId = hartswood.Id, OrganisationId = org.Id };
                            context.Plots.Add(plot);
                        }

                        context.SaveChanges();

                        DateTime start = new DateTime(2019, 11, 01);
                        DateTime end = new DateTime(2020, 10, 31);

                        Rental r = new Rental { OrganisationId = org.Id, PlotId = plot1.Id, TenantId = c.Id, Cost = 50, PaymentStatusId = psPaid.Id, StartDate = start, EndDate = end };
                        context.Rentals.Add(r);
                        context.SaveChanges();

                        RentalCharge rcRental = new RentalCharge { OrganisationId = org.Id, RentalId = r.Id, ChargeDiscountId = cdRental.Id, Amount = plot1.Size * cdRental.Amount };
                        RentalCharge rcMembership = new RentalCharge { OrganisationId = org.Id, RentalId = r.Id, ChargeDiscountId = cdMembership.Id, Amount = cdMembership.Amount };

                        context.RentalCharges.Add(rcRental);
                        context.RentalCharges.Add(rcMembership);
                        context.SaveChanges();

                        Payment p = new Payment { OrganisationId = org.Id, RentalId = r.Id, PaymentDate = DateTime.Now, PaymentTypeId = pt.Id, Amount = 50 };
                        context.Payments.Add(p);
                        context.SaveChanges();

                        AddSite(context, org.Id, "Bishops Hall", 25);
                        AddSite(context, org.Id, "Cresent Road", 12);
                        AddSite(context, org.Id, "Honeypot Lane", 10);
                        AddSite(context, org.Id, "Middle Road", 150);
                        AddSite(context, org.Id, "Ongar Road", 30);
                        AddSite(context, org.Id, "Park Road", 15);
                        AddSite(context, org.Id, "River Road", 25);


                    }

                }
            }


        }


        private void AddSite(AllotmentContext context, Guid orgId, string name, int noOfPlots)
        {
            Site site = new Site { Name = name, OrganisationId = orgId };
            context.Sites.Add(site);
            context.SaveChanges();

            for (int i = 0; i < noOfPlots; i++)
            {
                Plot p = new Plot { Name = i.ToString(), Size = 9, SiteId = site.Id, OrganisationId = orgId };
                context.Plots.Add(p);
            }
            context.SaveChanges();

        }
    }

}

