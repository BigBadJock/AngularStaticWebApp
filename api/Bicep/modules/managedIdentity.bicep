@description('managed identity name')
param  name string = 'allotment-identity'

@description('location')
param location string = resourceGroup().location


resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: name
  location: location
}

output managedIdentityId string = managedIdentity.id
