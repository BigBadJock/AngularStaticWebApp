using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.DependencyInjection;
using AllotmentFunctions.AuthorizationAttribute;
using AllotmentFunctions.Email;
using AllotmentFunctions.Password;
using Azure.Identity;
using AzureFunctions.Extensions.Swashbuckle;
using AzureFunctions.Extensions.Swashbuckle.Settings;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

[assembly: FunctionsStartup(typeof(AllotmentFunctions.Startup))]
namespace AllotmentFunctions
{
    public class Startup : FunctionsStartup
    {

        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            var configurationConnectionString = Environment.GetEnvironmentVariable("ConfigurationConnectionString");
            var deploymentEnvironment = Environment.GetEnvironmentVariable("deploymentEnvironment");

            builder.ConfigurationBuilder.AddAzureAppConfiguration(options =>
            {
                options.Connect(configurationConnectionString);
                options.Select("allotment:*", deploymentEnvironment);
                options.ConfigureKeyVault(kv => kv.SetCredential(new DefaultAzureCredential()));
                options.ConfigureRefresh(refresh =>
                {
                    refresh.Register("allotment:Sentinel", refreshAll: true);
                });
            });
        }

        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configurationEndpoint = Environment.GetEnvironmentVariable("ConfigurationEndpoint");
            var configurationConnectionString = Environment.GetEnvironmentVariable("ConfigurationConnectionString");
            var configKeys = Environment.GetEnvironmentVariable("configKeys");
            var localRoot = Environment.GetEnvironmentVariable("AzureWebJobsScriptRoot");
            var azureRoot = $"{Environment.GetEnvironmentVariable("Home")}/site/wwwroot";
            var actualRoot = localRoot ?? azureRoot;
            //            var configurationUri = new Uri(configurationEndpoint);


            var config = new ConfigurationBuilder()
                    .SetBasePath(actualRoot)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();

            builder.Services.AddAzureAppConfiguration();

            builder.Services.AddLogging(x =>
            {
                x.AddConsole();
                x.AddFilter<Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider>("", LogLevel.Trace);

                x.AddApplicationInsights(Environment.GetEnvironmentVariable("APPINSIGHTS_INSTRUMENTATIONKEY"));
                x.AddFilter<Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider>("", LogLevel.Trace);
            }
            );

            IFunctionsHostBuilder functionsHostBuilder = builder.AddSwashBuckle(Assembly.GetExecutingAssembly(), opts =>
            {
                opts.Documents = new[]
                {
                    new SwaggerDocument
                    {
                        Name="v1",
                        Title="Allotment API",
                        Description="Allotment API in Azure Functions",
                        Version="v1"
                    }
                };
                opts.ConfigureSwaggerGen = c =>
                {
                    var security = new Dictionary<string, IEnumerable<string>>
                    {
                        { "Bearer", Array.Empty<string>() }
                    };

                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                    {

                        In = ParameterLocation.Header,
                        Description = "Please paste JWT Token with Bearer + White Space + Token into field",
                        Name = "Authorization",
                        Scheme = "Bearer",
                        Type = SecuritySchemeType.ApiKey
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {
                            new OpenApiSecurityScheme()
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                Scheme = "oauth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header
                            },
                            new List<string>()
                        }
                    });
                };

            });

            IServiceCollection services = builder.Services;

            services.AddSingleton(config);

            services.AddApplicationInsightsTelemetry();


            string connectionString = config.GetConnectionString("DefaultConnection");

            services.AddDbContext<AllotmentContext>(options =>
                SqlServerDbContextOptionsExtensions.UseSqlServer(options, connectionString)
             );

            System.Diagnostics.Debug.WriteLine($"Jwt:SecretKey={config["Jwt:SecretKey"]}");
            System.Diagnostics.Debug.WriteLine($"Jwt:ExpiryMinutes={config["Jwt:ExpiryMinutes"]}");
            System.Diagnostics.Debug.WriteLine($"Jwt:RefreshTokenExpiryMinutes={config["Jwt:RefreshTokenExpiryMinutes"]}");

            var jwt = config.GetSection("Jwt");
            services.Configure<JWTSettings>(jwt);

            services.AddLocalization(options => options.ResourcesPath = "Resources");

            //Set up Identity
            services.AddIdentity<User, IdentityRole>(options =>
            {
                // lockout settings 
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;

                // Password
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 12;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;

                // signin
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedAccount = true;

                // tokens
                options.Tokens.ProviderMap.Add("CustomEmailConfirmation", new TokenProviderDescriptor(typeof(CustomEmailConfirmationTokenProvider<User>)));
                options.Tokens.EmailConfirmationTokenProvider = "CustomEmailConfirmation";

                options.Tokens.ProviderMap.Add("CustomPasswordTokenProvider", new TokenProviderDescriptor(typeof(CustomPasswordTokenProvider<User>)));
                options.Tokens.PasswordResetTokenProvider = "CustomPasswordTokenProvider";

                // user settings
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<AllotmentContext>();

            services.Configure<DataProtectionTokenProviderOptions>(o => o.TokenLifespan = TimeSpan.FromHours(3));
            services.AddTransient<CustomEmailConfirmationTokenProvider<User>>();
            services.AddTransient<CustomPasswordTokenProvider<User>>();
            services.Configure<SendGridOptions>(config);

            // Set up authorisation
            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                        .RequireAuthenticatedUser()
                        .Build();

                options.AddPolicy("AdminOnly", policy => policy.RequireClaim("ADMINISTRATOR", "true"));
                options.AddPolicy("ChargeDiscountAdmin", policy => policy.RequireClaim("CHARGEDISCOUNT_ADMIN", "true"));
                options.AddPolicy("CustomerAdmin", policy => policy.RequireClaim("CUSTOMER_ADMIN", "true"));
                options.AddPolicy("OrganisationUser", policy => policy.RequireClaim("ORGANISATION_ADMIN", "true"));
                options.AddPolicy("OrganisationSettingAdmin", policy => policy.RequireClaim("ORGANISATION_SETTING_ADMIN", "true"));
                options.AddPolicy("PaymentAdmin", policy => policy.RequireClaim("PAYMENT_ADMIN", "true"));
                options.AddPolicy("PaymentStatusAdmin", policy => policy.RequireClaim("PAYMENT_STATUS_ADMIN", "true"));
                options.AddPolicy("PaymentTypeAdmin", policy => policy.RequireClaim("PAYMENT_TYPE_ADMIN", "true"));
                options.AddPolicy("PlotAdmin", policy => policy.RequireClaim("PLOT_ADMIN", "true"));
                options.AddPolicy("RentalChargeAdmin", policy => policy.RequireClaim("RENTAL_CHARGE_ADMIN", "true"));
                options.AddPolicy("RentalAdmin", policy => policy.RequireClaim("RENTAL_ADMIN", "true"));
                options.AddPolicy("SettingAdmin", policy => policy.RequireClaim("SETTING_ADMIN", "true"));
                options.AddPolicy("SettingValueAdmin", policy => policy.RequireClaim("SETTING_VALUE_ADMIN", "true"));
                options.AddPolicy("SiteAdmin", policy => policy.RequireClaim("SITE_ADMIN", "true"));
                options.AddPolicy("WaitingListAdmin", policy => policy.RequireClaim("WAITING_LIST_ADMIN", "true"));

                options.AddPolicy("OrganisationAllowed", policy => policy.Requirements.Add(new OrganisationAllowedRequirement()));


            });
            services.AddSingleton<IAuthorizationHandler, OrganisationAuthorizationHandler>();

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = config["Jwt:Issuer"],
                        ValidAudience = config["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:SecretKey"])),
                        ClockSkew = TimeSpan.Zero

                    };
                });

            services.AddOptions();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            services.RegisterApiServices();
            services.AddScoped<IDbInitializer, AllotmentDbInitialiser>();
            services.Configure<AppSettings>(config);
        }

    }
}
