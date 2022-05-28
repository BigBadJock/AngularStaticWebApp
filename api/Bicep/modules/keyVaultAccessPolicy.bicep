@description('Name of the KeyVault resource ex. kv-myservice.')
param keyVaultName string

@description('Principal Id of the Azure resource (Managed Identity).')
param principalId string

@description('Assigned permissions for Principal Id (Managed Identity)')
param keyVaultPermissions object

@allowed([
  'add'
  'remove'
  'replace'
])
@description('Policy action.')
param policyAction string

resource keyVault_resource 'Microsoft.KeyVault/vaults@2019-09-01' existing = {
  name: keyVaultName
  resource keyVaultPolicies 'accessPolicies' = {
    name: policyAction
    properties: {    
      accessPolicies: [
        {
          objectId: principalId
          permissions: keyVaultPermissions
          tenantId: subscription().tenantId
        }
      ]
    }
  }  
}
