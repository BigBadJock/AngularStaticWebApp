
@description('Key Vault Name')
param keyVaultName string

@description('Key Name')
param keyName string

@description('Value')
param value string

resource keyVault_resource 'Microsoft.KeyVault/vaults@2021-06-01-preview' existing = {
  name: keyVaultName
}

resource kv_sendgrid_key_resource 'Microsoft.KeyVault/vaults/secrets@2021-06-01-preview' = {
  parent: keyVault_resource
  name: replace(keyName, '.', '-')
  properties: {
    value: value
    attributes: {
      enabled: true
    }
  }
}
