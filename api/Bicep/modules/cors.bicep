param functionAppName string

param origin string


@allowed([
  'add'
  'remove'
  'replace'
])
@description('Policy action.')
param action string

resource functionApp_resource 'Microsoft.Web/sites@2021-02-01' existing = {
  name: functionAppName
}

resource functionAppConfig_resource 'Microsoft.Web/sites/config@2021-02-01' existing = {
  parent: functionApp_resource
  resource config 'cors' = {
    name: 'web'
    properties:{
      cors:{      
        allowedOrigins: [
          origin
        ]
      }
    }
  }
}



