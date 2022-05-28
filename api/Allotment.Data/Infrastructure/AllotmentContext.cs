using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Allotment.Data.Infrastructure
{
    public class AllotmentContext : IdentityDbContext<User>, IDbContext
    {

        public AllotmentContext(DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .ToTable("AspNetUsers");
            builder.Entity<PlotsWithRentalsView>(eb =>
            {
                eb.ToTable("vPlotsWithRentals");
            });
            builder.Entity<PlotRentalHistoryView>(eb =>
            {
                eb.ToTable("vPlotRentalHistory");
            });

        }

        public async virtual void Commit()
        {
            await base.SaveChangesAsync();
        }

        public DbSet<CustomClaimType> CustomClaimsTypes { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Site> Sites { get; set; }
        public DbSet<Plot> Plots { get; set; }
        public DbSet<PlotRentalHistoryView> PlotRentalHistoryView { get; set; }
        public DbSet<PlotsWithRentalsView> PlotsWithRentaslView { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<ChargeDiscount> ChargeDiscounts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentStatus> PaymentStatus { get; set; }
        public DbSet<PaymentType> PaymentType { get; set; }
        public DbSet<RentalCharge> RentalCharges { get; set; }
        public DbSet<WaitingListEntry> WaitingList { get; set; }


    }
}
