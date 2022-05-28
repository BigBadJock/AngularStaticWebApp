@description('Keyvault Name')
param keyVaultName string

@description('Admin user object id')
param adminObjectId string

@description('location')
param location string = resourceGroup().location

@description('KeyVault Entries')
param keyVaultEntries array


resource keyVault_resource 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  location: location
  name: keyVaultName
  properties: {
    tenantId: subscription().tenantId
    accessPolicies:[
        {
        tenantId: subscription().tenantId
        objectId: adminObjectId
        permissions: {
          keys: [
            'all'
          ]
          secrets:[
            'all'
          ]
          certificates:[
            'all'
          ]
        }
      }
    ]
    sku: {
      name: 'standard'
      family: 'A'
    }
  }
}

output keyVaultUri string  = keyVault_resource.properties.vaultUri

module entry 'keyVaultEntry.bicep' = [for item in keyVaultEntries: {
  name: 'entry_${item.keyName}'
  dependsOn: [
    keyVault_resource
  ]
  params:{
    keyVaultName: keyVaultName
    keyName: item.keyName
    value: item.value
  }
}]
