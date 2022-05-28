@description('key vault name')
param keyVaultName string

@description('configuration store name')
param configurationStoreName string

@description('configuration store vaules')
param configurationStoreValues array

@description('Deployment Environment')
param deploymentEnvironment string = 'dev'

resource keyVault_resource 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: keyVaultName
}

resource configurationStore_resource 'Microsoft.AppConfiguration/configurationStores@2021-10-01-preview' existing = {
  name: configurationStoreName
}


module configurationStoreValuesDeployment './configurationStoreValue.bicep' = [for item in configurationStoreValues :  {
  name: 'csv_entry_${item.keyName}'
  dependsOn: [
    keyVault_resource
    configurationStore_resource
  ]
  params:{
    keyName: item.keyName
    prefix: item.prefix
    value: item.value
    contentType: item.contentType
    configurationStoreName: configurationStoreName
    deploymentEnvironment: deploymentEnvironment
  }
}]

