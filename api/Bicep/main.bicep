@description('Provide a name for the deployment environment e.g. dev, uat, stg, live')
@minLength(3)
@maxLength(5)
@allowed([
  'dev'
  'uat'
  'stg'
  'live'
])
param deploymentEnvironment string 

@description('app prefix')
@minLength(3)
@maxLength(10)
param appPrefix string = 'allotment'

@description('location')
param location string = 'uksouth'

@description('SQL Server Admin Name')
@minLength(8)
@maxLength(20)
//@secure()
param sqlServerAdminName string 

@description('SQL Server Admin password')
@minLength(8)
@maxLength(20)
//@secure()
param sqlServerAdminPassword string 

@description('SendGrid Key')
//@secure()
param sendGridKey string

@description('SendGrid User')
//@secure()
param sendGridUser string

@description('Forgotten Email Template Id')
//@secure()
param forgottenEmailTemplateId string

@description('Welcome Email Template Id')
//@secure()
param welcomeEmailTemplateId string

@description('frontend root url')
//@secure()
param frontEndRoot string

@description('jwt issuer')
param jwtIssuer string

@description('jwt audience')
param jwtAudience string

@description('jwt secret key')
param jwtSecretKey string





var adminObjectId = 'b0e5c25a-9a6f-4110-819a-100994ccb7c6'

var sharedResourceGroupName = '${appPrefix}-shared-rg'
var resourceGroupName = '${appPrefix}-${deploymentEnvironment}-rg'
var apiName = '${appPrefix}-${deploymentEnvironment}-api'
var applicationInsightsName = '${appPrefix}-${deploymentEnvironment}-app-insights'
var configurationStoreName = '${appPrefix}-configurationStore'
var keyVaultName = '${appPrefix}-${deploymentEnvironment}-keyvault'
var managedIdentityName = '${appPrefix}-${deploymentEnvironment}-managedIdentity'
var servicePlanName = '${appPrefix}-${deploymentEnvironment}-service-plan'
var sqlServerName = '${appPrefix}-${deploymentEnvironment}-sql'
var webProxyName = '${appPrefix}-${deploymentEnvironment}-web-proxy'


var apiStorageAccountSettings = {
    prefix: 'api'
    skuName : 'Standard_LRS'
    accessTier : 'Hot'
}

var webStorageAccountSettings = {
    prefix : 'web'
    skuName : 'Standard_LRS'
    accessTier : 'Hot'
}

var keyVaultEntries = [
  {
    keyName: 'sendGridApiKey'
    value: sendGridKey
  }
  {
    keyName: 'sendGridUser'
    value: sendGridUser 
  }
   {
    keyName: 'sqlServerAdminName'
    value: sqlServerAdminName
  }
  {
    keyName: 'sqlServerAdminPassword'
    value: sqlServerAdminPassword
  }
  {
    keyName: 'welcomeEmailTemplateId'
    value: welcomeEmailTemplateId
  }
  {
    keyName: 'forgottenEmailTemplateId'
    value: forgottenEmailTemplateId
  }
  {
    keyName: 'databaseConnectionString'
    value: '** update when created **'
  }
  {
    keyName: 'jwtSecretKey'
    value: jwtSecretKey
  }
]

var configurationStoreValues = [
  {
    prefix: appPrefix
    keyName: 'sendGridApiKey'
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/sendGridApiKey"}'
  }
  {
    prefix: appPrefix
    keyName: 'sendGridUser'
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/sendGridUser"}'
  }
  {
    prefix: appPrefix
    keyName: 'forgottenEmailTemplateId' 
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/forgottenEmailTemplateId"}'
  }
  {
    prefix: appPrefix
    keyName: 'welcomeEmailTemplateId' 
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/welcomeEmailTemplateId"}'
  }
  {
    prefix: appPrefix
    keyName: 'databaseConnectionString' 
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/databaseConnectionString"}'
  }  
  {
    prefix: appPrefix
    keyName: 'frontEndRootUrl'
    contentType: 'string'
    value: frontEndRoot
  }
  {
    prefix: appPrefix
    keyName: 'jwt-ExpiryMinutes'
    contentType: 'integer'
    value: '5'
  }
  {
    prefix: appPrefix
    keyName: 'jwt-RefreshTokenExpiryMinutes'
    contentType: 'integer'
    value: '40320'
  }  
  {
    prefix: appPrefix
    keyName: 'jwt-Issuer'
    contentType: 'string'
    value: jwtIssuer
  }
  {
    prefix: appPrefix
    keyName: 'jwt-Audience'
    contentType: 'string'
    value: jwtAudience
  }
  {
    prefix: appPrefix
    keyName: 'jwt-secretKey'
    contentType: 'application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8'
    value: '{"uri":"https://${keyVaultName}.${environment().suffixes.keyvaultDns}/secrets/jwt-secretKey"}'
  }   

]



targetScope = 'subscription'

resource rg_shared 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name : sharedResourceGroupName
  location : location
}

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name : resourceGroupName
  location : location
}

module managedIdentity_module 'modules/managedIdentity.bicep' ={
  name: 'managedIdentityDeployment'
  scope: rg
  params:{
    name : managedIdentityName
    location : location
  }
}

module keyVault_module './modules/keyvault.bicep' = {
  name: 'keyvaultDeployment'
  scope: rg
  params:{
    keyVaultName: keyVaultName
    adminObjectId: adminObjectId
    location: location
    keyVaultEntries: keyVaultEntries
  }
}

module configurationStore_module 'modules/configurationStore.bicep' = {
  name: 'configurationStoreDeployment'
  scope: rg_shared
  params:{
    name: configurationStoreName
    location: location
  }
}
  

module appServicePlan_module './modules/appServicePlan.bicep' = {
  name : servicePlanName
  scope: rg
  params:{
    name: servicePlanName
    location: location
  }
}

module api_storageAccount_module './modules/storageAccount.bicep'  = {
  name: 'apiStorageDeployment'
  scope: rg
  params:{
    deploymentEnvironment: deploymentEnvironment
    storageAccountSettings: apiStorageAccountSettings
    location: location
  }
}

module web_storageAccount_module './modules/storageAccount.bicep'  = {
  name: 'webStorageDeployment'
  scope: rg
  params:{
    deploymentEnvironment: deploymentEnvironment
    storageAccountSettings: webStorageAccountSettings
    location: location
  }
}


module sqlServer_module './modules/sqlServer.bicep' = {
  name: 'sqlServerDeployment'
  scope: rg
  params:{
    sqlServerName: sqlServerName
    adminName: sqlServerAdminName
    adminPassword: sqlServerAdminPassword
    location: location
  }
}

module appInsights_module './modules/appInsights.bicep' = {
  name: 'appInsightsDeployment'
  scope: rg
  params:{
    name: applicationInsightsName
    location: location
  }
}


module api_functionApp_module './modules/api.bicep' = {
  name: 'apiDeployment'
  scope: rg
  params:{
    name: apiName
    appInsightsInstrumentationKey: appInsights_module.outputs.appInsightsInstrumentationKey   
    servicePlanName: servicePlanName 
    storageAccountName: api_storageAccount_module.outputs.storageAccountName
    keyVaultName: keyVaultName
    location: location
  }
}

module webProxy './modules/webProxy.bicep' = {
  name: 'webProxyDeployment'
  scope: rg
  dependsOn: [
    api_functionApp_module
  ]
  params:{
    name: webProxyName
    appInsightsInstrumentationKey: appInsights_module.outputs.appInsightsInstrumentationKey    
    servicePlanName: servicePlanName 
    apiName: apiName
    storageAccountName: api_storageAccount_module.outputs.storageAccountName
    keyVaultName: keyVaultName
    location: location
  }
}

module configurationStoreValuesDeployment 'modules/configurationStoreValues.bicep' = {
  name: 'configurationStoreValuesDeployment'
  scope: rg_shared
  dependsOn: [
    keyVault_module
  ]
  params:{
    configurationStoreName: configurationStoreName
    configurationStoreValues: configurationStoreValues
    keyVaultName: keyVaultName
    deploymentEnvironment: deploymentEnvironment
  }
}



