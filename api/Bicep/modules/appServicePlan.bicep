@description('App Service Plan Name')
param name string

@description('location')
param location string = resourceGroup().location

resource servicePlan_resource 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: name
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}


output servicePlan_resource string = servicePlan_resource.id

