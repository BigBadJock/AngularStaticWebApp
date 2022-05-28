IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetRoles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetUsers] (
        [Id] nvarchar(450) NOT NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [ChargeDiscounts] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NULL,
        [ChargeOrDiscount] int NOT NULL,
        [Amount] decimal(18,4) NOT NULL,
        [IsPercentage] bit NOT NULL,
        [IsMultipleOfPlotSize] bit NOT NULL,
        CONSTRAINT [PK_ChargeDiscounts] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [CustomClaimsTypes] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_CustomClaimsTypes] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Organisations] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        [AddressLine1] nvarchar(max) NULL,
        [AddressLine2] nvarchar(max) NULL,
        [AddressLine3] nvarchar(max) NULL,
        [AddressLine4] nvarchar(max) NULL,
        [Locality] nvarchar(max) NULL,
        [TownOrCity] nvarchar(max) NULL,
        [County] nvarchar(max) NULL,
        [District] nvarchar(max) NULL,
        [Country] nvarchar(max) NULL,
        [PostCode] nvarchar(max) NULL,
        CONSTRAINT [PK_Organisations] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [OrganisationSettings] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [SettingId] uniqueidentifier NOT NULL,
        [SettingValueId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_OrganisationSettings] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [PaymentStatus] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_PaymentStatus] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [PaymentType] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_PaymentType] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [RefreshTokens] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [UserId] nvarchar(max) NULL,
        [Token] uniqueidentifier NOT NULL,
        [Expiry] datetime2 NOT NULL,
        CONSTRAINT [PK_RefreshTokens] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Settings] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Settings] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [SettingValues] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [SettingId] uniqueidentifier NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_SettingValues] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Tenants] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [Title] nvarchar(max) NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [AddressLine1] nvarchar(max) NULL,
        [AddressLine2] nvarchar(max) NULL,
        [AddressLine3] nvarchar(max) NULL,
        [AddressLine4] nvarchar(max) NULL,
        [Locality] nvarchar(max) NULL,
        [TownOrCity] nvarchar(max) NULL,
        [County] nvarchar(max) NULL,
        [District] nvarchar(max) NULL,
        [Country] nvarchar(max) NULL,
        [PostCode] nvarchar(max) NULL,
        CONSTRAINT [PK_Tenants] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [vPlotsWithRentals] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [SiteId] uniqueidentifier NOT NULL,
        [Size] int NOT NULL,
        [IsCurrentlyRented] bit NOT NULL,
        [IsUnderOffer] bit NOT NULL,
        [IsUncultivated] bit NOT NULL,
        [TenantId] uniqueidentifier NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [StartDate] datetime2 NULL,
        [EndDate] datetime2 NULL,
        [PaymentStatusId] uniqueidentifier NULL,
        [PaymentStatus] nvarchar(max) NULL,
        CONSTRAINT [PK_vPlotsWithRentals] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [WaitingList] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [SiteId] uniqueidentifier NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [UnderOffer] bit NOT NULL,
        [OfferDate] datetime2 NOT NULL,
        [PlotId] uniqueidentifier NOT NULL,
        [IsWaiting] bit NOT NULL,
        CONSTRAINT [PK_WaitingList] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetRoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetUserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetUserLogins] (
        [LoginProvider] nvarchar(450) NOT NULL,
        [ProviderKey] nvarchar(450) NOT NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetUserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [AspNetUserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(450) NOT NULL,
        [Name] nvarchar(450) NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Sites] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [NumberOfPlots] int NOT NULL,
        [UnletPlots] int NOT NULL,
        [WaitingList] int NOT NULL,
        [PlotsUnderOffer] int NOT NULL,
        [UncultivatedPlots] int NOT NULL,
        [UnpaidPlots] int NOT NULL,
        [TotalFees] decimal(18,4) NOT NULL,
        [UnpaidFees] decimal(18,4) NOT NULL,
        CONSTRAINT [PK_Sites] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Sites_Organisations_OrganisationId] FOREIGN KEY ([OrganisationId]) REFERENCES [Organisations] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Plots] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [Name] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [SiteId] uniqueidentifier NOT NULL,
        [Size] int NOT NULL,
        [IsCurrentlyRented] bit NOT NULL,
        [IsUnderOffer] bit NOT NULL,
        [IsUncultivated] bit NOT NULL,
        [TenantId] uniqueidentifier NULL,
        CONSTRAINT [PK_Plots] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Plots_Sites_SiteId] FOREIGN KEY ([SiteId]) REFERENCES [Sites] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Plots_Tenants_TenantId] FOREIGN KEY ([TenantId]) REFERENCES [Tenants] ([Id]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Rentals] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [PlotId] uniqueidentifier NOT NULL,
        [TenantId] uniqueidentifier NOT NULL,
        [Reference] nvarchar(max) NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Cost] decimal(18,4) NOT NULL,
        [PaymentStatusId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Rentals] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Rentals_Plots_PlotId] FOREIGN KEY ([PlotId]) REFERENCES [Plots] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Rentals_Tenants_TenantId] FOREIGN KEY ([TenantId]) REFERENCES [Tenants] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [Payments] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [RentalId] uniqueidentifier NOT NULL,
        [PaymentDate] datetime2 NOT NULL,
        [Amount] decimal(18,4) NOT NULL,
        [PaymentTypeId] uniqueidentifier NOT NULL,
        [TenantId] uniqueidentifier NULL,
        CONSTRAINT [PK_Payments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Payments_Rentals_RentalId] FOREIGN KEY ([RentalId]) REFERENCES [Rentals] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Payments_Tenants_TenantId] FOREIGN KEY ([TenantId]) REFERENCES [Tenants] ([Id]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE TABLE [RentalCharges] (
        [Id] uniqueidentifier NOT NULL,
        [IsDeleted] bit NOT NULL,
        [Created] datetime2 NOT NULL,
        [LastUpdated] datetime2 NOT NULL,
        [LastUpdatedBy] nvarchar(max) NULL,
        [OrganisationId] uniqueidentifier NOT NULL,
        [RentalId] uniqueidentifier NOT NULL,
        [ChargeDiscountId] uniqueidentifier NOT NULL,
        [Amount] decimal(18,4) NOT NULL,
        CONSTRAINT [PK_RentalCharges] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RentalCharges_Rentals_RentalId] FOREIGN KEY ([RentalId]) REFERENCES [Rentals] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Payments_RentalId] ON [Payments] ([RentalId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Payments_TenantId] ON [Payments] ([TenantId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Plots_SiteId] ON [Plots] ([SiteId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Plots_TenantId] ON [Plots] ([TenantId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_RentalCharges_RentalId] ON [RentalCharges] ([RentalId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Rentals_PlotId] ON [Rentals] ([PlotId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Rentals_TenantId] ON [Rentals] ([TenantId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    CREATE INDEX [IX_Sites_OrganisationId] ON [Sites] ([OrganisationId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206212639_initial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210206212639_initial', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206213225_vPlotsWithRentals')
BEGIN

    Execute('
    CREATE VIEW [dbo].[vPlotsWithRentals]
    AS
            SELECT p.*, 
                t.FirstName, 
                t.LastName, 
                cr.StartDate, 
                cr.EndDate, 
                cr.PaymentStatusId, 
                ps.Name AS PaymentStatus
            FROM Plots p
                LEFT JOIN
            (
                SELECT OrganisationId, 
                    PlotId, 
                    TenantId, 
                    StartDate, 
                    EndDate, 
                    r.PaymentStatusId
                FROM Rentals r
                WHERE StartDate < GETDATE()
                    AND EndDate > GETDATE()
            ) cr ON cr.PlotId = p.id
                LEFT JOIN Tenants t ON t.Id = p.TenantId
                LEFT JOIN PaymentStatus ps ON ps.Id = cr.PaymentStatusId;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206213225_vPlotsWithRentals')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210206213225_vPlotsWithRentals', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206224905_updateSiteStats')
BEGIN

    Execute('
    CREATE PROCEDURE dbo.UpdateSiteStats @organisationId UNIQUEIDENTIFIER, 
                                         @siteId UNIQUEIDENTIFIER
    AS
         DECLARE @sitePlots INT;
                DECLARE @currentlyRented INT;
                DECLARE @underOffer INT;
                DECLARE @uncultivated INT;

                SELECT @sitePlots = COUNT(*),
                       @currentlyRented = SUM(IIF(p.IsCurrentlyRented = 1, 1, 0)),
                       @underOffer = SUM(IIF(p.isUnderOffer = 1, 1, 0)),
                       @uncultivated = SUM(IIF(p.IsUncultivated = 1, 1, 0))
         FROM[Plots] p
        WHERE p.OrganisationId = @organisationId
               AND p.SiteId = @siteId
               AND p.IsDeleted = 0
         GROUP BY p.OrganisationId, 
                  p.SiteId;

                UPDATE sites
           SET
               NumberOfPlots = @sitePlots,
               PlotsUnderOffer = @underOffer,
               UncultivatedPlots = @uncultivated
         WHERE id = @siteId;
                RETURN 0;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206224905_updateSiteStats')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210206224905_updateSiteStats', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206225209_updateOrganisationStats')
BEGIN

    Execute('
    CREATE OR ALTER PROCEDURE dbo.UpdateOrganisationStats @organisationId UNIQUEIDENTIFIER
    AS
         DECLARE @siteId UNIQUEIDENTIFIER;
         DECLARE @return_value INT;

         DECLARE siteCursor CURSOR
         FOR SELECT id
             FROM sites s
             WHERE s.OrganisationId = @organisationId;

         OPEN siteCursor;

         FETCH NEXT FROM siteCursor INTO @siteId;

         WHILE @@FETCH_STATUS = 0
             BEGIN
                 EXEC @return_value = [dbo].[UpdateSiteStats] 
                      @organisationId = @organisationId, 
                      @siteId = @siteId;
                 FETCH NEXT FROM siteCursor INTO @siteId;
             END;

         CLOSE siteCursor;
         DEALLOCATE siteCursor;

         RETURN @return_value;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210206225209_updateOrganisationStats')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210206225209_updateOrganisationStats', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'WaitingList');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [WaitingList] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'UnpaidPlots');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [UnpaidPlots] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'UnpaidFees');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [UnpaidFees] decimal(18,4) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'UnletPlots');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [UnletPlots] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'UncultivatedPlots');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [UncultivatedPlots] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'TotalFees');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [TotalFees] decimal(18,4) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'PlotsUnderOffer');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [PlotsUnderOffer] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Sites]') AND [c].[name] = N'NumberOfPlots');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [Sites] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [Sites] ALTER COLUMN [NumberOfPlots] int NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185111_Update_Site_Table')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210325185111_Update_Site_Table', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185309_add_UpdateAllOrganistionStats_storedProc')
BEGIN

    Execute('
    ALTER PROCEDURE [dbo].[UpdateAllOrganisationStats]
    AS
        BEGIN
            -- SET NOCOUNT ON added to prevent extra result sets from
            -- interfering with SELECT statements.
            SET NOCOUNT ON;

            DECLARE
                   @organisationId UNIQUEIDENTIFIER;
            DECLARE
                   @return_value INT;

            DECLARE organisationCursor CURSOR
            FOR SELECT
                   id
                FROM
                     organisations o
                WHERE o.IsDeleted = 0;

            OPEN organisationCursor;

            FETCH NEXT FROM organisationCursor INTO
                                                    @organisationId;

            WHILE @@FETCH_STATUS = 0
                BEGIN
                    EXEC @return_value = [dbo].[UpdateOrganisationStats]
                         @organisationId = @organisationId;
                    FETCH NEXT FROM organisationCursor INTO
                                                            @organisationId;
                END;

            CLOSE organisationCursor;
            DEALLOCATE organisationCursor;

            RETURN @return_value;
        END;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185309_add_UpdateAllOrganistionStats_storedProc')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210325185309_add_UpdateAllOrganistionStats_storedProc', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185748_add_CreateSite_storedProc')
BEGIN

    Execute('
    CREATE OR ALTER PROCEDURE [dbo].[CreateSite]
                              -- Add the parameters for the stored procedure here
                              @organisationId UNIQUEIDENTIFIER
                            , @name           VARCHAR(200)
                            , @noOfPlots      INT
                            , @userId         VARCHAR(200)
                            , @siteId         UNIQUEIDENTIFIER OUTPUT
                            , @message        VARCHAR(200) OUTPUT
    AS
        BEGIN
            -- SET NOCOUNT ON added to prevent extra result sets from
            -- interfering with SELECT statements.
            SET NOCOUNT ON;

            DECLARE
                   @output TABLE
            (
                                 [id] UNIQUEIDENTIFIER
            );

            DECLARE
                   @count INT;

            DECLARE
                   @alreadyExists BIT;

            SELECT
               @alreadyExists = 1
            FROM
                 [dbo].[sites] s
            WHERE s.[Name] = @name
                  AND s.OrganisationId = @organisationId;

            IF @alreadyExists = 1
                BEGIN
                    -- create error message
                    SET @message = ''A site with that name already exists'';
                    RETURN -2;
                END;

            IF @name IS NULL
               OR @noOfPlots IS NULL
                BEGIN
                    -- create error message
                    SET @message = ''Site missing required information'';

                    RETURN -3;
                END;

            --Insert statements for procedure here
            DECLARE
                   @startTrancount INT;

            BEGIN TRY
                SELECT
                   @startTrancount = @@TRANCOUNT;
                IF @startTrancount = 0
                BEGIN TRANSACTION;

                INSERT INTO [dbo].[sites]
                (
                   [Id]
                 , [OrganisationId]
                 , [name]
                 , [NumberOfPlots]
                 , [UnletPlots]
                 , [UncultivatedPlots]
                 , [UnpaidPlots]
                 , [UnpaidFees]
                 , [WaitingList]
                 , [PlotsUnderOffer]
                 , [TotalFees]
                 , [created]
                 , [LastUpdated]
                 , [LastUpdatedBy]
                 , [IsDeleted]
                )
                OUTPUT
                   INSERTED.[id]
                       INTO @output
                VALUES
                (
                       NEWID()
                     , @organisationId
                     , @name
                     , @noOfPlots
                     , @noOfPlots
                     , @noOfPlots
                     , 0
                     , 0
                     , 0
                     , 0
                     , 0
                     , GETDATE()
                     , GETDATE()
                     , @userId
                     , 0
                );

                SELECT
                   @siteId = [id] FROM
                                       @output;

                SET @count = 1;

                WHILE @count <= @noOfPlots
                    BEGIN
                        INSERT INTO [dbo].[plots]
                        (
                           [Id]
                         , [OrganisationId]
                         , [SiteId]
                         , [Name]
                         , [IsCurrentlyRented]
                         , [IsUncultivated]
                         , [IsUnderOffer]
                         , [Size]
                         , [created]
                         , [LastUpdated]
                         , [LastUpdatedBy]
                         , [IsDeleted]
                        )
                        VALUES
                        (
                               NEWID()
                             , @organisationId
                             , @siteId
                             , FORMAT(@count, ''000'', ''en-GB'')
                             , 0
                             , 0
                             , 0
                             , 0
                             , GETDATE()
                             , GETDATE()
                             , @userId
                             , 0
                        );

                        SET @count = @count + 1;
                    END;

                IF @startTrancount = 0
                    COMMIT TRANSACTION;

                SELECT
                   @message = ''Success'';
            END TRY
            BEGIN CATCH
                IF @startTrancount = 0
                    ROLLBACK TRANSACTION;
                SET @message = ''Error in [createSite]: '' + ERROR_MESSAGE();

                RETURN 51500;
            END CATCH;
        END;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210325185748_add_CreateSite_storedProc')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210325185748_add_CreateSite_storedProc', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210508233208_add vPlotRentalHistory')
BEGIN

    execute('
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
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210508233208_add vPlotRentalHistory')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210508233208_add vPlotRentalHistory', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515210402_update organisation settings table')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210515210402_update organisation settings table', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515214151_move settings to org table')
BEGIN
    DROP TABLE [OrganisationSettings];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515214151_move settings to org table')
BEGIN
    DROP TABLE [Settings];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515214151_move settings to org table')
BEGIN
    DROP TABLE [SettingValues];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515214151_move settings to org table')
BEGIN
    ALTER TABLE [Organisations] ADD [Settings] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210515214151_move settings to org table')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210515214151_move settings to org table', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'IsWaiting');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [IsWaiting];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var9 sysname;
    SELECT @var9 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'OfferDate');
    IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var9 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [OfferDate];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var10 sysname;
    SELECT @var10 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'PlotId');
    IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var10 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [PlotId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var11 sysname;
    SELECT @var11 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'SiteId');
    IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var11 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [SiteId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var12 sysname;
    SELECT @var12 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'StartDate');
    IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var12 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [StartDate];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var13 sysname;
    SELECT @var13 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'TenantId');
    IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var13 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [TenantId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    DECLARE @var14 sysname;
    SELECT @var14 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[WaitingList]') AND [c].[name] = N'UnderOffer');
    IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [WaitingList] DROP CONSTRAINT [' + @var14 + '];');
    ALTER TABLE [WaitingList] DROP COLUMN [UnderOffer];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [AddressLine1] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [AddressLine2] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [AddressLine3] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [AddressLine4] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [Email] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [FirstName] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [LastName] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [Phone] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [PostCode] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [Sites] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    ALTER TABLE [WaitingList] ADD [Title] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210516191016_update waiting list')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210516191016_update waiting list', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210521001211_remove plots from tenant model')
BEGIN
    ALTER TABLE [Plots] DROP CONSTRAINT [FK_Plots_Tenants_TenantId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210521001211_remove plots from tenant model')
BEGIN
    DROP INDEX [IX_Plots_TenantId] ON [Plots];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210521001211_remove plots from tenant model')
BEGIN
    DECLARE @var15 sysname;
    SELECT @var15 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Plots]') AND [c].[name] = N'TenantId');
    IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Plots] DROP CONSTRAINT [' + @var15 + '];');
    ALTER TABLE [Plots] DROP COLUMN [TenantId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210521001211_remove plots from tenant model')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210521001211_remove plots from tenant model', N'3.1.4');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210527221832_update_vPlotsWithRentals')
BEGIN

    execute('
    	CREATE OR ALTER   VIEW [dbo].[vPlotsWithRentals]
    	 AS
    			SELECT
    				p.*
    			 , t.id AS TenantId
    			 , t.FirstName
    			 , t.LastName
    			 , cr.StartDate
    			 , cr.EndDate
    			 , cr.PaymentStatusId
    			 , ps.Name AS PaymentStatus
    			FROM
    				  Plots p
    				  LEFT JOIN
    			(
    				 SELECT
    					 OrganisationId
    				  , PlotId
    				  , TenantId
    				  , StartDate
    				  , EndDate
    				  , r.PaymentStatusId
    				 FROM
    						Rentals r
    			where StartDate < getdate()
    			and EndDate > getdate()
    			) cr ON cr.PlotId = p.id
    				  LEFT JOIN Tenants t ON t.Id = cr.TenantId
    				  LEFT JOIN PaymentStatus ps ON ps.Id = cr.PaymentStatusId;
    ');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210527221832_update_vPlotsWithRentals')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210527221832_update_vPlotsWithRentals', N'3.1.4');
END;

GO

