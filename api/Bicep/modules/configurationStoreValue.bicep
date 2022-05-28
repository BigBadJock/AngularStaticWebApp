@description('Configuration Store Name')
param configurationStoreName string

@description('key prefix')
param prefix string

@description('key name')
param keyName string

@description('value')
param value string

@description('content type')
param contentType string = 'string'

@description('Deployment Environment')
param deploymentEnvironment string = 'dev'

var label = deploymentEnvironment
var keyValueName = empty(label) ? '${prefix}:${keyName}' : '${prefix}:${keyName}$${label}'

resource configurationStore 'Microsoft.AppConfiguration/configurationStores@2021-10-01-preview' existing = {
  name: configurationStoreName
}

resource configurationStoreValue 'Microsoft.AppConfiguration/configurationStores/keyValues@2021-10-01-preview' = {
  name: keyValueName
  parent: configurationStore
  properties: {
    contentType: contentType
    value: value
    tags: {
      environment: deploymentEnvironment
    }
  }
}
