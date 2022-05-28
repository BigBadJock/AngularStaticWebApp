@description('App Insights Name')
param name string

@description('location')
param location string = resourceGroup().location

resource appInsights_Resource 'microsoft.insights/components@2020-02-02' = {
  name: name
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 90
    IngestionMode: 'ApplicationInsights'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

output appInsightsInstrumentationKey string = appInsights_Resource.properties.InstrumentationKey
