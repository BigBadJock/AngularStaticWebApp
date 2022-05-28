@description('API Name')
param name string

@description('App Insights Resource Id')
param appInsightsInstrumentationKey string

@description('Service Plan name')
param servicePlanName string

@description('storage account name')
param storageAccountName string

@description('key vault name')
param keyVaultName string

@description('location')
param location string = resourceGroup().location

resource storageAccount 'Microsoft.Storage/storageAccounts@2019-04-01' existing = {
  name: storageAccountName
}

resource servicePlan 'Microsoft.Web/serverfarms@2021-02-01' existing = {
  name: servicePlanName
}

resource api_resource 'Microsoft.Web/sites@2021-02-01' = {
  name: name
  location: location
  kind: 'functionapp'
  properties: {
    httpsOnly: true
    serverFarmId: servicePlan.id
    enabled: true
    hostNameSslStates: [
      {
        name: '${name}.azurewebsites.net'
        hostType: 'Standard'
        sslState: 'Disabled'
      }
            {
        name: '${name}.scm.azurewebsites.net'
        hostType: 'Standard'
        sslState: 'Disabled'
      }
    ]
    hyperV: false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: false
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
      appSettings:[
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value}'
        }       
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '3'
        }
        {
          'name': 'FUNCTIONS_WORKER_RUNTIME'
          'value': 'dotnet'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value}'
        }   
      ]
      cors:{
        allowedOrigins: [
          'https://functions.azure.com'
          'https://functions-staging.azure.com'
          'https://functions-next.azure.com'
          'http://localhost:4200'
        ]
      }
    }
    scmSiteAlsoStopped: false
    clientCertEnabled: false
    clientCertMode: 'Required'
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
  identity:{
      type: 'SystemAssigned'
  }
}

module keyVaultAccessPolicy_module 'keyVaultAccessPolicy.bicep' = {
  name: 'keyVault_api'
  params: {
    keyVaultPermissions: {
      keys: [
        'get'
        'list'
      ]
      secrets: [
        'get'
        'list'
      ]
      'certificates': [
        'get'
        'list'
        'getissuers'
      ]
    }
    keyVaultName: keyVaultName
    policyAction: 'add'
    principalId: api_resource.identity.principalId
  }
}




