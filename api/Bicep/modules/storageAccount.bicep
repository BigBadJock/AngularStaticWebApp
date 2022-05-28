@description('Name of Deployment Environment')
param deploymentEnvironment string

@description('Storage Account Settings')
param storageAccountSettings object

@description('location')
param location string = resourceGroup().location

resource storage_resource 'Microsoft.Storage/storageAccounts@2021-06-01' =  {
  name : '${storageAccountSettings.prefix}${deploymentEnvironment}${uniqueString(resourceGroup().id)}'
  location : location
  sku:{
    name : storageAccountSettings.skuName
  }
  kind : 'StorageV2'
  properties:{
    accessTier: storageAccountSettings.accessTier
    allowBlobPublicAccess: true
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    encryption:{
      keySource: 'Microsoft.Storage'
      services:{
        blob:{
          keyType: 'Account'
          enabled: true
        }
        file:{
          keyType: 'Account'
          enabled: true
        }
      }
    }    
  }
}

output storageAccountName string  = storage_resource.name
