using Allotment.Data.DependencyInjection;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Allotment.Services.DependencyInjection
{
    public static class StartupExtensions
    {
        public static void RegisterApiServices(this IServiceCollection services)
        {
            System.Console.WriteLine("register api services");
            services.RegisterDataServices();
            services.AddScoped<UserManager<User>, UserManager<User>>();
            services.AddScoped<SignInManager<User>, SignInManager<User>>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<IChargeDiscountService, ChargeDiscountService>();
            services.AddScoped<ITenantService, TenantService>();
            services.AddScoped<IOrganisationService, OrganisationService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IPaymentStatusService, PaymentStatusService>();
            services.AddScoped<IPaymentTypeService, PaymentTypeService>();
            services.AddScoped<IPlotService, PlotService>();
            services.AddScoped<IRentalChargeService, RentalChargeService>();
            services.AddScoped<IRentalService, RentalService>();
            services.AddScoped<ISendGridService, SendGridService>();
            services.AddScoped<ISiteService, SiteService>();
            services.AddScoped<IWaitingListService, WaitingListService>();
            services.AddScoped<ISendGridService, SendGridService>();

         }
    }
}
