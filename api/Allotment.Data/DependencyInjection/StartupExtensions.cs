using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Data.Repositories;
using Allotment.Data.StoredProcs;
using Allotment.Models;
using Core.Common.Contracts;
using Core.Common.DataModels;
using Microsoft.Extensions.DependencyInjection;
using REST_Parser.DependencyResolution;

namespace Allotment.Data.DependencyInjection
{
    public static class StartupExtensions
    {
        public static void RegisterDataServices(this IServiceCollection services)
        {
            //string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            //string connectionString = "Server=127.0.0.1,1433;Initial Catalog=HomeLibrary;user id=sa;password=D3v3l0p3r@SQL;MultipleActiveResultSets=true;";
            //services.AddDbContext<HomeLibraryContext>(option =>
            //    option.UseSqlServer(connectionString)
            //);

            services.RegisterRestParser<CustomClaimType>();
            services.RegisterRestParser<RefreshToken>();

            services.RegisterRestParser<ChargeDiscount>();
            services.RegisterRestParser<Tenant>();
            services.RegisterRestParser<Organisation>();
            services.RegisterRestParser<Payment>();
            services.RegisterRestParser<PaymentStatus>();
            services.RegisterRestParser<PaymentType>();
            services.RegisterRestParser<Plot>();
            services.RegisterRestParser<PlotRentalHistoryView>();
            services.RegisterRestParser<PlotsWithRentalsView>();
            services.RegisterRestParser<RentalCharge>();
            services.RegisterRestParser<Rental>();
            services.RegisterRestParser<Site>();
            services.RegisterRestParser<WaitingListEntry>();


            services.AddScoped<AllotmentContext, AllotmentContext>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<ICustomClaimTypeRepository, CustomClaimTypeRepository>();

            services.AddScoped<IChargeDiscountRepository, ChargeDiscountRepository>();
            services.AddScoped<ITenantRepository, TenantRepository>();
            services.AddScoped<IOrganisationRepository, OrganisationRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPaymentStatusRepository, PaymentStatusRepository>();
            services.AddScoped<IPaymentTypeRepository, PaymentTypeRepository>();
            services.AddScoped<IPlotRepository, PlotRepository>();
            services.AddScoped<IPlotRentalHistoryViewRepository, PlotRentalHistoryViewRepository>();
            services.AddScoped<IPlotsWithRentalsViewRepository, PlotsWithRentalsViewRepository>();
            services.AddScoped<IRentalChargeRepository, RentalChargeRepository>();
            services.AddScoped<IRentalRepository, RentalRepository>();
            services.AddScoped<ISiteRepository, SiteRepository>();
            services.AddScoped<IWaitingListRepository, WaitingListRepository>();

            services.AddScoped<ITestStoredProc, TestStoredProc>();
        }
    }
}
