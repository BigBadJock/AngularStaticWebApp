
@description('configuration Store Name')
param name string

@description('location')
param location string = resourceGroup().location

resource configurationStore 'Microsoft.AppConfiguration/configurationStores@2021-10-01-preview' = {
  name: name
  location: location

  sku: {
    name: 'free'
  }

  identity: {
    type: 'SystemAssigned'
  }

  properties: {
    createMode: 'Default'
    disableLocalAuth: false
    enablePurgeProtection: false
    publicNetworkAccess: 'Enabled'
    softDeleteRetentionInDays: 0
  }
}

output configurationStoreId string = configurationStore.id
