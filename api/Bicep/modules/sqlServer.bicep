@description('SQL Server Name')
param sqlServerName string

@description('SQL Server Admin name')
param adminName string

@description('SQL Server Admin Password')
param adminPassword string

@description('location')
param location string = resourceGroup().location

resource servers_allotment_dev_uks_sql_name_resource 'Microsoft.Sql/servers@2021-05-01-preview' = {
  name: sqlServerName
  location: location
  properties: {
    administratorLogin: adminName
    administratorLoginPassword: adminPassword
    version: '12.0'
    publicNetworkAccess: 'Enabled'
    restrictOutboundNetworkAccess: 'Disabled'
  }
}

