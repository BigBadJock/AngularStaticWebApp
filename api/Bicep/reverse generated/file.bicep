@secure()
param vulnerabilityAssessments_Default_storageContainerPath string
param serverfarms_UKSouthPlan_name string = 'UKSouthPlan'
param sites_allotment_web_proxy_name string = 'allotment-web-proxy'
param servers_allotment_dev_uks_sql_name string = 'allotment-dev-uks-sql'
param vaults_allotment_dev_keyvault_name string = 'allotment-dev-keyvault'
param sites_allotment_dev_uks_allotment_api_name string = 'allotment-dev-uks-allotment-api'
param storageAccounts_allotmentdevuksweb_name string = 'allotmentdevuksweb'
param serverfarms_ASP_allotmentdevuksrg_8267_name string = 'ASP-allotmentdevuksrg-8267'
param serverfarms_ASP_allotmentdevuksrg_b791_name string = 'ASP-allotmentdevuksrg-b791'
param storageAccounts_allotmentdevuksapistor_name string = 'allotmentdevuksapistor'
param components_allotment_dev_uks_app_insights_name string = 'allotment-dev-uks-app-insights'
param actionGroups_Application_Insights_Smart_Detection_name string = 'Application Insights Smart Detection'
param configurationStores_allotment_dev_uks_configuration_store_name string = 'allotment-dev-uks-configuration-store'
param smartdetectoralertrules_failure_anomalies_allotment_dev_uks_app_insights_name string = 'failure anomalies - allotment-dev-uks-app-insights'

resource configurationStores_allotment_dev_uks_configuration_store_name_resource 'Microsoft.AppConfiguration/configurationStores@2021-03-01-preview' = {
  name: configurationStores_allotment_dev_uks_configuration_store_name
  location: 'uksouth'
  sku: {
    name: 'free'
  }
  properties: {
    encryption: {}
    disableLocalAuth: false
  }
}

resource actionGroups_Application_Insights_Smart_Detection_name_resource 'microsoft.insights/actionGroups@2021-09-01' = {
  name: actionGroups_Application_Insights_Smart_Detection_name
  location: 'Global'
  properties: {
    groupShortName: 'SmartDetect'
    enabled: true
    emailReceivers: []
    smsReceivers: []
    webhookReceivers: []
    eventHubReceivers: []
    itsmReceivers: []
    azureAppPushReceivers: []
    automationRunbookReceivers: []
    voiceReceivers: []
    logicAppReceivers: []
    azureFunctionReceivers: []
    armRoleReceivers: [
      {
        name: 'Monitoring Contributor'
        roleId: '749f88d5-cbae-40b8-bcfc-e573ddc772fa'
        useCommonAlertSchema: true
      }
      {
        name: 'Monitoring Reader'
        roleId: '43d0d8ad-25c7-4714-9337-8ba259a9fe05'
        useCommonAlertSchema: true
      }
    ]
  }
}

resource components_allotment_dev_uks_app_insights_name_resource 'microsoft.insights/components@2020-02-02' = {
  name: components_allotment_dev_uks_app_insights_name
  location: 'uksouth'
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'AzurePowerShell'
    RetentionInDays: 90
    IngestionMode: 'ApplicationInsights'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource vaults_allotment_dev_keyvault_name_resource 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  name: vaults_allotment_dev_keyvault_name
  location: 'uksouth'
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: '2830f0bf-34aa-4391-ac34-d524e49950c8'
    accessPolicies: [
      {
        tenantId: '2830f0bf-34aa-4391-ac34-d524e49950c8'
        objectId: '5aa34e0b-890d-4496-ae6a-c0bfcb85b569'
        permissions: {
          keys: [
            'get'
            'list'
            'update'
            'create'
            'import'
            'delete'
            'recover'
            'backup'
            'restore'
          ]
          secrets: [
            'get'
            'list'
            'set'
            'delete'
            'recover'
            'backup'
            'restore'
          ]
          certificates: [
            'get'
            'list'
            'update'
            'create'
            'import'
            'delete'
            'recover'
            'backup'
            'restore'
            'managecontacts'
            'manageissuers'
            'getissuers'
            'listissuers'
            'setissuers'
            'deleteissuers'
          ]
        }
      }
      {
        tenantId: '2830f0bf-34aa-4391-ac34-d524e49950c8'
        objectId: 'b0e5c25a-9a6f-4110-819a-100994ccb7c6'
        permissions: {
          keys: [
            'get'
            'create'
            'delete'
            'list'
            'update'
            'import'
            'backup'
            'restore'
            'recover'
          ]
          secrets: [
            'get'
            'list'
            'set'
            'delete'
            'backup'
            'restore'
            'recover'
          ]
          certificates: [
            'get'
            'delete'
            'list'
            'create'
            'import'
            'update'
            'deleteissuers'
            'getissuers'
            'listissuers'
            'managecontacts'
            'manageissuers'
            'setissuers'
            'recover'
            'backup'
            'restore'
          ]
          storage: [
            'delete'
            'deletesas'
            'get'
            'getsas'
            'list'
            'listsas'
            'regeneratekey'
            'set'
            'setsas'
            'update'
            'recover'
            'backup'
            'restore'
          ]
        }
      }
      {
        tenantId: '2830f0bf-34aa-4391-ac34-d524e49950c8'
        objectId: '263aa4c1-450b-46f9-ad5d-abc6d5f870bf'
        permissions: {
          keys: [
            'unwrapKey'
            'decrypt'
            'list'
            'get'
            'wrapKey'
          ]
          secrets: [
            'list'
            'get'
          ]
          certificates: []
        }
      }
    ]
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: false
    vaultUri: 'https://${vaults_allotment_dev_keyvault_name}.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

resource servers_allotment_dev_uks_sql_name_resource 'Microsoft.Sql/servers@2021-05-01-preview' = {
  name: servers_allotment_dev_uks_sql_name
  location: 'uksouth'
  properties: {
    administratorLogin: 'allotment-admin'
    version: '12.0'
    publicNetworkAccess: 'Enabled'
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

resource storageAccounts_allotmentdevuksapistor_name_resource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccounts_allotmentdevuksapistor_name
  location: 'uksouth'
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_0'
    allowBlobPublicAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource storageAccounts_allotmentdevuksweb_name_resource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccounts_allotmentdevuksweb_name
  location: 'uksouth'
  sku: {
    name: 'Standard_GRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_0'
    allowBlobPublicAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource serverfarms_ASP_allotmentdevuksrg_8267_name_resource 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: serverfarms_ASP_allotmentdevuksrg_8267_name
  location: 'UK South'
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource serverfarms_ASP_allotmentdevuksrg_b791_name_resource 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: serverfarms_ASP_allotmentdevuksrg_b791_name
  location: 'UK South'
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource serverfarms_UKSouthPlan_name_resource 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: serverfarms_UKSouthPlan_name
  location: 'UK South'
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource components_allotment_dev_uks_app_insights_name_degradationindependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'degradationindependencyduration'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'degradationindependencyduration'
      DisplayName: 'Degradation in dependency duration'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_degradationinserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'degradationinserverresponsetime'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'degradationinserverresponsetime'
      DisplayName: 'Degradation in server response time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_digestMailConfiguration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'digestMailConfiguration'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'digestMailConfiguration'
      DisplayName: 'Digest Mail Configuration'
      Description: 'This rule describes the digest mail preferences'
      HelpUrl: 'www.homail.com'
      IsHidden: true
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_billingdatavolumedailyspikeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_billingdatavolumedailyspikeextension'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_billingdatavolumedailyspikeextension'
      DisplayName: 'Abnormal rise in daily data volume (preview)'
      Description: 'This detection rule automatically analyzes the billing data generated by your application, and can warn you about an unusual increase in your application\'s billing costs'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/tree/master/SmartDetection/billing-data-volume-daily-spike.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_canaryextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_canaryextension'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_canaryextension'
      DisplayName: 'Canary extension'
      Description: 'Canary extension'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/'
      IsHidden: true
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_exceptionchangeextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_exceptionchangeextension'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_exceptionchangeextension'
      DisplayName: 'Abnormal rise in exception volume (preview)'
      Description: 'This detection rule automatically analyzes the exceptions thrown in your application, and can warn you about unusual patterns in your exception telemetry.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/abnormal-rise-in-exception-volume.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_memoryleakextension 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_memoryleakextension'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_memoryleakextension'
      DisplayName: 'Potential memory leak detected (preview)'
      Description: 'This detection rule automatically analyzes the memory consumption of each process in your application, and can warn you about potential memory leaks or increased memory consumption.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/tree/master/SmartDetection/memory-leak.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_securityextensionspackage 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_securityextensionspackage'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_securityextensionspackage'
      DisplayName: 'Potential security issue detected (preview)'
      Description: 'This detection rule automatically analyzes the telemetry generated by your application and detects potential security issues.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/application-security-detection-pack.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_extension_traceseveritydetector 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'extension_traceseveritydetector'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'extension_traceseveritydetector'
      DisplayName: 'Degradation in trace severity ratio (preview)'
      Description: 'This detection rule automatically analyzes the trace logs emitted from your application, and can warn you about unusual patterns in the severity of your trace telemetry.'
      HelpUrl: 'https://github.com/Microsoft/ApplicationInsights-Home/blob/master/SmartDetection/degradation-in-trace-severity-ratio.md'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_longdependencyduration 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'longdependencyduration'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'longdependencyduration'
      DisplayName: 'Long dependency duration'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_migrationToAlertRulesCompleted 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'migrationToAlertRulesCompleted'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'migrationToAlertRulesCompleted'
      DisplayName: 'Migration To Alert Rules Completed'
      Description: 'A configuration that controls the migration state of Smart Detection to Smart Alerts'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: true
      IsEnabledByDefault: false
      IsInPreview: true
      SupportsEmailNotifications: false
    }
    Enabled: false
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_slowpageloadtime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'slowpageloadtime'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'slowpageloadtime'
      DisplayName: 'Slow page load time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource components_allotment_dev_uks_app_insights_name_slowserverresponsetime 'microsoft.insights/components/ProactiveDetectionConfigs@2018-05-01-preview' = {
  parent: components_allotment_dev_uks_app_insights_name_resource
  name: 'slowserverresponsetime'
  location: 'uksouth'
  properties: {
    RuleDefinitions: {
      Name: 'slowserverresponsetime'
      DisplayName: 'Slow server response time'
      Description: 'Smart Detection rules notify you of performance anomaly issues.'
      HelpUrl: 'https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics'
      IsHidden: false
      IsEnabledByDefault: true
      IsInPreview: false
      SupportsEmailNotifications: true
    }
    Enabled: true
    SendEmailsToSubscriptionOwners: true
    CustomEmails: []
  }
}

resource vaults_allotment_dev_keyvault_name_DefaultConnection 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'DefaultConnection'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_ForgottenEmailTemplateId 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'ForgottenEmailTemplateId'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_Jwt_Audience 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'Jwt-Audience'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_Jwt_ExpiryMinutes 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'Jwt-ExpiryMinutes'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_JWT_RefreshTokenExpiryMinutes 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'JWT-RefreshTokenExpiryMinutes'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_Jwt_SecretKey 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'Jwt-SecretKey'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_SendGridKey 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'SendGridKey'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_SendGridUser 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'SendGridUser'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource vaults_allotment_dev_keyvault_name_WelcomeEmailTemplateId 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: vaults_allotment_dev_keyvault_name_resource
  name: 'WelcomeEmailTemplateId'
  location: 'uksouth'
  properties: {
    attributes: {
      enabled: true
    }
  }
}

resource servers_allotment_dev_uks_sql_name_CreateIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_allotment_dev_uks_sql_name_DbParameterization 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_allotment_dev_uks_sql_name_DefragmentIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_allotment_dev_uks_sql_name_DropIndex 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
}

resource servers_allotment_dev_uks_sql_name_ForceLastGoodPlan 'Microsoft.Sql/servers/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
}

resource servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/auditingPolicies@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'default'
  location: 'UK South'
  properties: {
    auditingState: 'Disabled'
  }
}

resource Microsoft_Sql_servers_auditingSettings_servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/auditingSettings@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource Microsoft_Sql_servers_connectionPolicies_servers_allotment_dev_uks_sql_name_default 'Microsoft.Sql/servers/connectionPolicies@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'default'
  location: 'uksouth'
  properties: {
    connectionType: 'Default'
  }
}

resource servers_allotment_dev_uks_sql_name_allotment 'Microsoft.Sql/servers/databases@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'allotment'
  location: 'uksouth'
  sku: {
    name: 'Basic'
    tier: 'Basic'
    capacity: 5
  }
  kind: 'v12.0,user'
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: 2147483648
    catalogCollation: 'SQL_Latin1_General_CP1_CI_AS'
    zoneRedundant: false
    readScale: 'Disabled'
    requestedBackupStorageRedundancy: 'Geo'
    maintenanceConfigurationId: '/subscriptions/ab89677c-84ca-49f1-a281-3793f34080e3/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default'
    isLedgerOn: false
  }
}

resource servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  location: 'UK South'
  properties: {
    auditingState: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/auditingSettings@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2014-04-01' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  location: 'UK South'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_master_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Current'
  properties: {}
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_allotment_dev_uks_sql_name_master_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Current'
  properties: {
    state: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_allotment_dev_uks_sql_name_master_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2021-05-01-preview' = {
  name: '${servers_allotment_dev_uks_sql_name}/master/Default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
    }
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_devOpsAuditingSettings_servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/devOpsAuditingSettings@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'Default'
  properties: {
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_allotment_dev_uks_sql_name_current 'Microsoft.Sql/servers/encryptionProtector@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'current'
  kind: 'servicemanaged'
  properties: {
    serverKeyName: 'ServiceManaged'
    serverKeyType: 'ServiceManaged'
    autoRotationEnabled: false
  }
}

resource Microsoft_Sql_servers_extendedAuditingSettings_servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/extendedAuditingSettings@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'default'
  properties: {
    retentionDays: 0
    auditActionsAndGroups: []
    isStorageSecondaryKeyInUse: false
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
}

resource servers_allotment_dev_uks_sql_name_AllowedIPs 'Microsoft.Sql/servers/firewallRules@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'AllowedIPs'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource servers_allotment_dev_uks_sql_name_ClientIPAddress_2021_01_08_09_19_40 'Microsoft.Sql/servers/firewallRules@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'ClientIPAddress_2021-01-08_09:19:40'
  properties: {
    startIpAddress: '81.152.216.192'
    endIpAddress: '81.152.216.192'
  }
}

resource servers_allotment_dev_uks_sql_name_ClientIPAddress_2021_05_09_11_16_13 'Microsoft.Sql/servers/firewallRules@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'ClientIPAddress_2021-05-09_11:16:13'
  properties: {
    startIpAddress: '81.157.160.121'
    endIpAddress: '81.157.160.121'
  }
}

resource servers_allotment_dev_uks_sql_name_John_s_Desktop 'Microsoft.Sql/servers/firewallRules@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'John\'s Desktop'
  properties: {
    startIpAddress: '86.147.100.188'
    endIpAddress: '86.147.100.188'
  }
}

resource servers_allotment_dev_uks_sql_name_John_s_PC 'Microsoft.Sql/servers/firewallRules@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'John\'s PC'
  properties: {
    startIpAddress: '81.151.218.113'
    endIpAddress: '81.151.218.113'
  }
}

resource servers_allotment_dev_uks_sql_name_ServiceManaged 'Microsoft.Sql/servers/keys@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'ServiceManaged'
  kind: 'servicemanaged'
  properties: {
    serverKeyType: 'ServiceManaged'
  }
}

resource Microsoft_Sql_servers_securityAlertPolicies_servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/securityAlertPolicies@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'Default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
}

resource Microsoft_Sql_servers_vulnerabilityAssessments_servers_allotment_dev_uks_sql_name_Default 'Microsoft.Sql/servers/vulnerabilityAssessments@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_resource
  name: 'default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
    }
    storageContainerPath: vulnerabilityAssessments_Default_storageContainerPath
  }
}

resource storageAccounts_allotmentdevuksapistor_name_default 'Microsoft.Storage/storageAccounts/blobServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_resource
  name: 'default'
  sku: {
    name: 'Standard_RAGRS'
    tier: 'Standard'
  }
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      enabled: false
    }
  }
}

resource storageAccounts_allotmentdevuksweb_name_default 'Microsoft.Storage/storageAccounts/blobServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_resource
  name: 'default'
  sku: {
    name: 'Standard_GRS'
    tier: 'Standard'
  }
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      enabled: false
    }
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksapistor_name_default 'Microsoft.Storage/storageAccounts/fileServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_resource
  name: 'default'
  sku: {
    name: 'Standard_RAGRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksweb_name_default 'Microsoft.Storage/storageAccounts/fileServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_resource
  name: 'default'
  sku: {
    name: 'Standard_GRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_allotmentdevuksapistor_name_default 'Microsoft.Storage/storageAccounts/queueServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_allotmentdevuksweb_name_default 'Microsoft.Storage/storageAccounts/queueServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_allotmentdevuksapistor_name_default 'Microsoft.Storage/storageAccounts/tableServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_allotmentdevuksweb_name_default 'Microsoft.Storage/storageAccounts/tableServices@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_resource
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource sites_allotment_dev_uks_allotment_api_name_resource 'Microsoft.Web/sites@2021-02-01' = {
  name: sites_allotment_dev_uks_allotment_api_name
  location: 'UK South'
  kind: 'functionapp'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${sites_allotment_dev_uks_allotment_api_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${sites_allotment_dev_uks_allotment_api_name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_ASP_allotmentdevuksrg_b791_name_resource.id
    reserved: false
    isXenon: false
    hyperV: false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '6F29A6F2925B1F7B64B9E9451A7FF777B0E012D2D4465205B477DC17FD61078A'
    containerSize: 1536
    dailyMemoryTimeQuota: 0
    httpsOnly: false
    redundancyMode: 'None'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource sites_allotment_web_proxy_name_resource 'Microsoft.Web/sites@2021-02-01' = {
  name: sites_allotment_web_proxy_name
  location: 'UK South'
  kind: 'functionapp'
  properties: {
    enabled: true
    hostNameSslStates: [
      {
        name: '${sites_allotment_web_proxy_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: '${sites_allotment_web_proxy_name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
    serverFarmId: serverfarms_ASP_allotmentdevuksrg_8267_name_resource.id
    reserved: false
    isXenon: false
    hyperV: false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: true
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    customDomainVerificationId: '6F29A6F2925B1F7B64B9E9451A7FF777B0E012D2D4465205B477DC17FD61078A'
    containerSize: 1536
    dailyMemoryTimeQuota: 0
    httpsOnly: false
    redundancyMode: 'None'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ftp'
  location: 'UK South'
  properties: {
    allow: true
  }
}

resource sites_allotment_web_proxy_name_ftp 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2021-02-01' = {
  parent: sites_allotment_web_proxy_name_resource
  name: 'ftp'
  location: 'UK South'
  properties: {
    allow: true
  }
}

resource sites_allotment_dev_uks_allotment_api_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'scm'
  location: 'UK South'
  properties: {
    allow: true
  }
}

resource sites_allotment_web_proxy_name_scm 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2021-02-01' = {
  parent: sites_allotment_web_proxy_name_resource
  name: 'scm'
  location: 'UK South'
  properties: {
    allow: true
  }
}

resource sites_allotment_dev_uks_allotment_api_name_web 'Microsoft.Web/sites/config@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'web'
  location: 'UK South'
  properties: {
    numberOfWorkers: 1
    defaultDocuments: [
      'Default.htm'
      'Default.html'
      'Default.asp'
      'index.htm'
      'index.html'
      'iisstart.htm'
      'default.aspx'
      'index.php'
    ]
    netFrameworkVersion: 'v4.0'
    phpVersion: '5.6'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$allotment-dev-uks-allotment-api'
    scmType: 'None'
    use32BitWorkerProcess: true
    webSocketsEnabled: false
    alwaysOn: false
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: false
      }
    ]
    loadBalancing: 'LeastRequests'
    experiments: {
      rampUpRules: []
    }
    autoHealEnabled: false
    vnetRouteAllEnabled: false
    vnetPrivatePortsCount: 0
    cors: {
      allowedOrigins: [
        'https://functions.azure.com'
        'https://functions-staging.azure.com'
        'https://functions-next.azure.com'
        'http://172.23.32.1'
        'https://lemon-stone-0740f1203.azurestaticapps.net'
        'https://allotment-web-proxy.azurewebsites.net'
        'https://allotmentdevuksweb.z33.web.core.windows.net'
        'http://localhost:4200'
      ]
      supportCredentials: false
    }
    localMySqlEnabled: false
    managedServiceIdentityId: 3311
    ipSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictionsUseMain: false
    http20Enabled: false
    minTlsVersion: '1.2'
    scmMinTlsVersion: '1.0'
    ftpsState: 'AllAllowed'
    preWarmedInstanceCount: 0
    functionAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: false
    minimumElasticInstanceCount: 0
    azureStorageAccounts: {}
  }
}

resource sites_allotment_web_proxy_name_web 'Microsoft.Web/sites/config@2021-02-01' = {
  parent: sites_allotment_web_proxy_name_resource
  name: 'web'
  location: 'UK South'
  properties: {
    numberOfWorkers: 1
    defaultDocuments: [
      'Default.htm'
      'Default.html'
      'Default.asp'
      'index.htm'
      'index.html'
      'iisstart.htm'
      'default.aspx'
      'index.php'
    ]
    netFrameworkVersion: 'v4.0'
    phpVersion: '5.6'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: false
    acrUseManagedIdentityCreds: false
    logsDirectorySizeLimit: 35
    detailedErrorLoggingEnabled: false
    publishingUsername: '$allotment-web-proxy'
    scmType: 'None'
    use32BitWorkerProcess: true
    webSocketsEnabled: false
    alwaysOn: false
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: false
      }
    ]
    loadBalancing: 'LeastRequests'
    experiments: {
      rampUpRules: []
    }
    autoHealEnabled: false
    vnetRouteAllEnabled: false
    vnetPrivatePortsCount: 0
    cors: {
      allowedOrigins: [
        'https://functions.azure.com'
        'https://functions-staging.azure.com'
        'https://functions-next.azure.com'
      ]
      supportCredentials: false
    }
    localMySqlEnabled: false
    ipSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictions: [
      {
        ipAddress: 'Any'
        action: 'Allow'
        priority: 1
        name: 'Allow all'
        description: 'Allow all access'
      }
    ]
    scmIpSecurityRestrictionsUseMain: false
    http20Enabled: false
    minTlsVersion: '1.2'
    scmMinTlsVersion: '1.0'
    ftpsState: 'AllAllowed'
    preWarmedInstanceCount: 0
    functionAppScaleLimit: 0
    functionsRuntimeScaleMonitoringEnabled: false
    minimumElasticInstanceCount: 0
    azureStorageAccounts: {}
  }
}

resource sites_allotment_dev_uks_allotment_api_name_1f06bf1e9c86dbfb7f27761b9097c65a627c9a091625241190563 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '1f06bf1e9c86dbfb7f27761b9097c65a627c9a091625241190563'
  location: 'UK South'
  properties: {
    status: 4
    author: 'BigBadJock'
    deployer: 'GitHub'
    message: '{"type":"Deployment","sha":"1f06bf1e9c86dbfb7f27761b9097c65a627c9a09","repoName":"BigBadJock/Allotment","slotName":"production"}'
    start_time: '2021-07-02T15:53:11.4744181Z'
    end_time: '2021-07-02T15:53:11.4744181Z'
    active: true
  }
}

resource sites_allotment_dev_uks_allotment_api_name_30319fed4cfe42a680d34b3b3225c055 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '30319fed4cfe42a680d34b3b3225c055'
  location: 'UK South'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'GITHUB_ZIP_DEPLOY'
    message: 'Created via a push deployment'
    start_time: '2021-05-27T22:27:11.3590075Z'
    end_time: '2021-05-27T22:27:37.9923727Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_4ee750e5d6f444ecb45bbb40182cf477 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '4ee750e5d6f444ecb45bbb40182cf477'
  location: 'UK South'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'GITHUB_ZIP_DEPLOY'
    message: 'Created via a push deployment'
    start_time: '2021-07-02T15:52:32.2353335Z'
    end_time: '2021-07-02T15:53:02.1599621Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_549da55cec53da36ba3243ed2b54d2f0ddf0ec151621711843018 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '549da55cec53da36ba3243ed2b54d2f0ddf0ec151621711843018'
  location: 'UK South'
  properties: {
    status: 4
    author: 'BigBadJock'
    deployer: 'GitHub'
    message: '{"type":"Deployment","sha":"549da55cec53da36ba3243ed2b54d2f0ddf0ec15","repoName":"BigBadJock/Allotment","slotName":"production"}'
    start_time: '2021-05-22T19:30:43.8119291Z'
    end_time: '2021-05-22T19:30:43.8119291Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_56266fc9efee4053812fa25e5807f261 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '56266fc9efee4053812fa25e5807f261'
  location: 'UK South'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'GITHUB_ZIP_DEPLOY'
    message: 'Created via a push deployment'
    start_time: '2021-05-22T16:32:48.4414982Z'
    end_time: '2021-05-22T16:33:14.9607823Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_615b025d16a25d44d26e256f174c32b6b42646bd1621701199814 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '615b025d16a25d44d26e256f174c32b6b42646bd1621701199814'
  location: 'UK South'
  properties: {
    status: 4
    author: 'BigBadJock'
    deployer: 'GitHub'
    message: '{"type":"Deployment","sha":"615b025d16a25d44d26e256f174c32b6b42646bd","repoName":"BigBadJock/Allotment","slotName":"production"}'
    start_time: '2021-05-22T16:33:20.281377Z'
    end_time: '2021-05-22T16:33:20.281377Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_7f0c42d53e3bfb39ee47fb6b28a5e12b1a09ee961622154463006 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '7f0c42d53e3bfb39ee47fb6b28a5e12b1a09ee961622154463006'
  location: 'UK South'
  properties: {
    status: 4
    author: 'BigBadJock'
    deployer: 'GitHub'
    message: '{"type":"Deployment","sha":"7f0c42d53e3bfb39ee47fb6b28a5e12b1a09ee96","repoName":"BigBadJock/Allotment","slotName":"production"}'
    start_time: '2021-05-27T22:27:43.4642461Z'
    end_time: '2021-05-27T22:27:43.4642461Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ddbc0ee8f5d24cecabf2755d28597299 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ddbc0ee8f5d24cecabf2755d28597299'
  location: 'UK South'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'GITHUB_ZIP_DEPLOY'
    message: 'Created via a push deployment'
    start_time: '2021-05-22T16:30:57.3311371Z'
    end_time: '2021-05-22T16:31:28.391875Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ebca484ae9f87bd4809597b41871e96cde0bea561621701092137 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ebca484ae9f87bd4809597b41871e96cde0bea561621701092137'
  location: 'UK South'
  properties: {
    status: 4
    author: 'BigBadJock'
    deployer: 'GitHub'
    message: '{"type":"Deployment","sha":"ebca484ae9f87bd4809597b41871e96cde0bea56","repoName":"BigBadJock/Allotment","slotName":"production"}'
    start_time: '2021-05-22T16:31:32.8069691Z'
    end_time: '2021-05-22T16:31:32.8069691Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_faafa654602e4ce5b806ca7800b4fa36 'Microsoft.Web/sites/deployments@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'faafa654602e4ce5b806ca7800b4fa36'
  location: 'UK South'
  properties: {
    status: 4
    author_email: 'N/A'
    author: 'N/A'
    deployer: 'GITHUB_ZIP_DEPLOY'
    message: 'Created via a push deployment'
    start_time: '2021-05-22T19:30:12.5162875Z'
    end_time: '2021-05-22T19:30:37.5226913Z'
    active: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ConfirmEmail 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ConfirmEmail'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ConfirmEmail/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ConfirmEmail/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/ConfirmEmail.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/ConfirmEmail'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/confirmemail'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_CreateOrganisation 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'CreateOrganisation'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateOrganisation/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateOrganisation/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/CreateOrganisation.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/CreateOrganisation'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisation'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_CreatePlot 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'CreatePlot'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreatePlot/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreatePlot/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/CreatePlot.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/CreatePlot'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plot'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_CreateSite 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'CreateSite'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateSite/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateSite/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/CreateSite.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/CreateSite'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/site'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_CreateWaitingList 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'CreateWaitingList'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateWaitingList/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/CreateWaitingList/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/CreateWaitingList.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/CreateWaitingList'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/waitinglist'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_DeleteOrganisation 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'DeleteOrganisation'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteOrganisation/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteOrganisation/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/DeleteOrganisation.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/DeleteOrganisation'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisation'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_DeletePlot 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'DeletePlot'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeletePlot/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeletePlot/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/DeletePlot.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/DeletePlot'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plot'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_DeleteSite 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'DeleteSite'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteSite/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteSite/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/DeleteSite.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/DeleteSite'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/site'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_DeleteWaitingList 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'DeleteWaitingList'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteWaitingList/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/DeleteWaitingList/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/DeleteWaitingList.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/DeleteWaitingList'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/waitinglist'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ForgottenPasswordRequest 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ForgottenPasswordRequest'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ForgottenPasswordRequest/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ForgottenPasswordRequest/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/ForgottenPasswordRequest.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/ForgottenPasswordRequest'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/forgottenpasswordrequest/{useremail}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetOrganisationById 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetOrganisationById'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganisationById/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganisationById/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetOrganisationById.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetOrganisationById'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisation/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetOrganisationStats 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetOrganisationStats'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganisationStats/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganisationStats/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetOrganisationStats.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetOrganisationStats'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisation/stats/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetOrganistationsByRestQuery 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetOrganistationsByRestQuery'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganistationsByRestQuery/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetOrganistationsByRestQuery/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetOrganistationsByRestQuery.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetOrganistationsByRestQuery'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisations/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetPlotById 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetPlotById'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotById/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotById/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetPlotById.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetPlotById'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plot/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetPlotRentalHistory 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetPlotRentalHistory'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotRentalHistory/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotRentalHistory/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetPlotRentalHistory.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetPlotRentalHistory'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plotrentalhistory/query/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetPlotsByRestQuery 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetPlotsByRestQuery'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotsByRestQuery/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotsByRestQuery/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetPlotsByRestQuery.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetPlotsByRestQuery'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plots/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetPlotsWithRentalsByRestQuery 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetPlotsWithRentalsByRestQuery'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotsWithRentalsByRestQuery/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetPlotsWithRentalsByRestQuery/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetPlotsWithRentalsByRestQuery.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetPlotsWithRentalsByRestQuery'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plotswithrentals/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetSiteById 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetSiteById'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetSiteById/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetSiteById/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetSiteById.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetSiteById'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/site/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetSitesByRestQuery 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetSitesByRestQuery'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetSitesByRestQuery/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetSitesByRestQuery/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetSitesByRestQuery.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetSitesByRestQuery'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/site/query/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetWaitingListById 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetWaitingListById'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetWaitingListById/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetWaitingListById/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetWaitingListById.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetWaitingListById'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/waitinglist/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_GetWaitingListsByRestQuery 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'GetWaitingListsByRestQuery'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetWaitingListsByRestQuery/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/GetWaitingListsByRestQuery/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/GetWaitingListsByRestQuery.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/GetWaitingListsByRestQuery'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/waitinglist/query/{restquery}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_RefreshAccessToken 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'RefreshAccessToken'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/RefreshAccessToken/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/RefreshAccessToken/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/RefreshAccessToken.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/RefreshAccessToken'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/refreshaccesstoken'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_Register 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'Register'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/Register/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/Register/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/Register.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/Register'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/register'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_ResetPassword 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'ResetPassword'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ResetPassword/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/ResetPassword/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/ResetPassword.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/ResetPassword'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/resetpassword'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_SignIn 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'SignIn'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SignIn/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SignIn/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/SignIn.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/SignIn'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/signin'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_SignOut 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'SignOut'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SignOut/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SignOut/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/SignOut.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/SignOut'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/account/signout'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_Swagger 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'Swagger'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/Swagger/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/Swagger/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/Swagger.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/Swagger'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/swagger/json'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_SwaggerUI 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'SwaggerUI'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SwaggerUI/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/SwaggerUI/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/SwaggerUI.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/SwaggerUI'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/swagger/ui'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_UpdateOrganisation 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'UpdateOrganisation'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateOrganisation/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateOrganisation/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/UpdateOrganisation.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/UpdateOrganisation'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/organisation'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_UpdatePlot 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'UpdatePlot'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdatePlot/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdatePlot/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/UpdatePlot.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/UpdatePlot'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/plot/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_UpdateSite 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'UpdateSite'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateSite/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateSite/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/UpdateSite.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/UpdateSite'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/site/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_UpdateWaitingList 'Microsoft.Web/sites/functions@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: 'UpdateWaitingList'
  location: 'UK South'
  properties: {
    script_root_path_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateWaitingList/'
    script_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/bin/Allotment.Functions.dll'
    config_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/site/wwwroot/UpdateWaitingList/function.json'
    test_data_href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/vfs/data/Functions/sampledata/UpdateWaitingList.dat'
    href: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/admin/functions/UpdateWaitingList'
    config: {}
    invoke_url_template: 'https://allotment-dev-uks-allotment-api.azurewebsites.net/api/waitinglist/{id}'
    language: 'DotNetAssembly'
    isDisabled: false
  }
}

resource sites_allotment_dev_uks_allotment_api_name_sites_allotment_dev_uks_allotment_api_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2021-02-01' = {
  parent: sites_allotment_dev_uks_allotment_api_name_resource
  name: '${sites_allotment_dev_uks_allotment_api_name}.azurewebsites.net'
  location: 'UK South'
  properties: {
    siteName: 'allotment-dev-uks-allotment-api'
    hostNameType: 'Verified'
  }
}

resource sites_allotment_web_proxy_name_sites_allotment_web_proxy_name_azurewebsites_net 'Microsoft.Web/sites/hostNameBindings@2021-02-01' = {
  parent: sites_allotment_web_proxy_name_resource
  name: '${sites_allotment_web_proxy_name}.azurewebsites.net'
  location: 'UK South'
  properties: {
    siteName: 'allotment-web-proxy'
    hostNameType: 'Verified'
  }
}

resource smartdetectoralertrules_failure_anomalies_allotment_dev_uks_app_insights_name_resource 'microsoft.alertsmanagement/smartdetectoralertrules@2021-04-01' = {
  name: smartdetectoralertrules_failure_anomalies_allotment_dev_uks_app_insights_name
  location: 'global'
  properties: {
    description: 'Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls.'
    state: 'Enabled'
    severity: 'Sev3'
    frequency: 'PT1M'
    detector: {
      id: 'FailureAnomaliesDetector'
    }
    scope: [
      components_allotment_dev_uks_app_insights_name_resource.id
    ]
    actionGroups: {
      groupIds: [
        actionGroups_Application_Insights_Smart_Detection_name_resource.id
      ]
    }
  }
}

resource servers_allotment_dev_uks_sql_name_allotment_CreateIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'CreateIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_DbParameterization 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'DbParameterization'
  properties: {
    autoExecuteValue: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_DefragmentIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'DefragmentIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_DropIndex 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'DropIndex'
  properties: {
    autoExecuteValue: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_ForceLastGoodPlan 'Microsoft.Sql/servers/databases/advisors@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'ForceLastGoodPlan'
  properties: {
    autoExecuteValue: 'Enabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/auditingPolicies@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  location: 'UK South'
  properties: {
    auditingState: 'Disabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_auditingSettings_servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/auditingSettings@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_backupLongTermRetentionPolicies_servers_allotment_dev_uks_sql_name_allotment_default 'Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    weeklyRetention: 'PT0S'
    monthlyRetention: 'PT0S'
    yearlyRetention: 'PT0S'
    weekOfYear: 0
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_backupShortTermRetentionPolicies_servers_allotment_dev_uks_sql_name_allotment_default 'Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    retentionDays: 7
    diffBackupIntervalInHours: 24
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_extendedAuditingSettings_servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/extendedAuditingSettings@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    retentionDays: 0
    isAzureMonitorTargetEnabled: false
    state: 'Disabled'
    storageAccountSubscriptionId: '00000000-0000-0000-0000-000000000000'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_geoBackupPolicies_servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/geoBackupPolicies@2014-04-01' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'Default'
  location: 'UK South'
  properties: {
    state: 'Enabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource servers_allotment_dev_uks_sql_name_allotment_Current 'Microsoft.Sql/servers/databases/ledgerDigestUploads@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'current'
  properties: {}
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_securityAlertPolicies_servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/securityAlertPolicies@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    state: 'Disabled'
    disabledAlerts: [
      ''
    ]
    emailAddresses: [
      ''
    ]
    emailAccountAdmins: false
    retentionDays: 0
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_transparentDataEncryption_servers_allotment_dev_uks_sql_name_allotment_Current 'Microsoft.Sql/servers/databases/transparentDataEncryption@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'current'
  properties: {
    state: 'Enabled'
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource Microsoft_Sql_servers_databases_vulnerabilityAssessments_servers_allotment_dev_uks_sql_name_allotment_Default 'Microsoft.Sql/servers/databases/vulnerabilityAssessments@2021-05-01-preview' = {
  parent: servers_allotment_dev_uks_sql_name_allotment
  name: 'default'
  properties: {
    recurringScans: {
      isEnabled: false
      emailSubscriptionAdmins: true
    }
  }
  dependsOn: [
    servers_allotment_dev_uks_sql_name_resource
  ]
}

resource storageAccounts_allotmentdevuksweb_name_default_web 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_default
  name: '$web'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksweb_name_resource
  ]
}

resource storageAccounts_allotmentdevuksapistor_name_default_azure_webjobs_hosts 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_default
  name: 'azure-webjobs-hosts'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksapistor_name_resource
  ]
}

resource storageAccounts_allotmentdevuksweb_name_default_azure_webjobs_hosts 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_default
  name: 'azure-webjobs-hosts'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksweb_name_resource
  ]
}

resource storageAccounts_allotmentdevuksapistor_name_default_azure_webjobs_secrets 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksapistor_name_default
  name: 'azure-webjobs-secrets'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksapistor_name_resource
  ]
}

resource storageAccounts_allotmentdevuksweb_name_default_azure_webjobs_secrets 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-06-01' = {
  parent: storageAccounts_allotmentdevuksweb_name_default
  name: 'azure-webjobs-secrets'
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksweb_name_resource
  ]
}

resource storageAccounts_allotmentdevuksweb_name_default_all0tment_proxya36a 'Microsoft.Storage/storageAccounts/fileServices/shares@2021-06-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksweb_name_default
  name: 'all0tment-proxya36a'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksweb_name_resource
  ]
}

resource storageAccounts_allotmentdevuksapistor_name_default_allotment_dev_uks_allotment_api 'Microsoft.Storage/storageAccounts/fileServices/shares@2021-06-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksapistor_name_default
  name: 'allotment-dev-uks-allotment-api'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksapistor_name_resource
  ]
}

resource storageAccounts_allotmentdevuksapistor_name_default_allotment_dev_uks_allotment_api9b96 'Microsoft.Storage/storageAccounts/fileServices/shares@2021-06-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksapistor_name_default
  name: 'allotment-dev-uks-allotment-api9b96'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksapistor_name_resource
  ]
}

resource storageAccounts_allotmentdevuksapistor_name_default_allotment_test_fun_appb5ea 'Microsoft.Storage/storageAccounts/fileServices/shares@2021-06-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksapistor_name_default
  name: 'allotment-test-fun-appb5ea'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksapistor_name_resource
  ]
}

resource storageAccounts_allotmentdevuksweb_name_default_allotment_web_proxybb3c 'Microsoft.Storage/storageAccounts/fileServices/shares@2021-06-01' = {
  parent: Microsoft_Storage_storageAccounts_fileServices_storageAccounts_allotmentdevuksweb_name_default
  name: 'allotment-web-proxybb3c'
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: 5120
    enabledProtocols: 'SMB'
  }
  dependsOn: [
    storageAccounts_allotmentdevuksweb_name_resource
  ]
}
