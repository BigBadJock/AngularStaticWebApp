using Allotment.API.AuthorizationAttribute;
using Allotment.API.Email;
using Allotment.API.Password;
using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.DTOs;
using Allotment.Models;
using Allotment.Services.DependencyInjection;
using Allotment.Services.Interfaces;
using Ardalis.GuardClauses;
using Core.Common.DataModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Resources;
using System.Text;

namespace Allotment.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        private IConfiguration configuration;
        public IConfiguration Configuration
        {
            get
            {
                return this.configuration;
            }
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AllotmentContext>(options =>
                options.UseSqlServer(this.configuration.GetConnectionString("DefaultConnection"))
             );

            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.Configure<JWTSettings>(Configuration.GetSection("JWT"));

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
            services.Configure<SendGridOptions>(Configuration);

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                        .RequireAuthenticatedUser()
                        .Build();

                options.AddPolicy("AdminOnly", policy => policy.RequireClaim("ADMINISTRATOR", "true"));
                options.AddPolicy("ChargeDiscountAdmin", policy => policy.RequireClaim("CHARGEDISCOUNT_ADMIN", "true"));
                options.AddPolicy("TenantAdmin", policy => policy.RequireClaim("TENANT_ADMIN", "true"));
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


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
                 {
                     options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = Configuration["Jwt:Issuer"],
                         ValidAudience = Configuration["Jwt:Audience"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
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
            services.AddControllers();
            IServiceCollection serviceCollection = services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Allotment API", Version = "v1" });

                c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "Allotment.API.xml"));

                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", Array.Empty<string>() }
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
                            Reference =new OpenApiReference
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
            });

            services.AddScoped<IDbInitializer, AllotmentDbInitialiser>();
            services.Configure<AppSettings>(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            Guard.Against.Null(app, nameof(app));
            Guard.Against.Null(env, nameof(env));

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SampleApi V1");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                var scopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
                using (var scope = scopeFactory.CreateScope())
                {
                    var dbInitializer = scope.ServiceProvider.GetService<IDbInitializer>();
                    dbInitializer.Initialize();
                    dbInitializer.SeedData();
                }

            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseCors("CorsPolicy");

            var supportedCultures = new[]
            {
                new CultureInfo("en"),
                new CultureInfo("en-US"),
                new CultureInfo("gd-GB")

            };


            var requestLocalizationOptions = new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en"),
                SupportedCultures= supportedCultures,
                SupportedUICultures=supportedCultures
            };

            app.UseRequestLocalization(requestLocalizationOptions);

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
