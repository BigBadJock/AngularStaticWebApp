# How to Run BICEP

## Install BICEP
```
az bicep install
az bicep upgrade
az bicep version
```

## How to login in to Azure

```
az login

az account list --output table

az account set --subscription {id}
```

## Running BICEP

```
az deployment sub create --template-file main.bicep --parameters environment=uat --location uksouth
```

**NOTE: If you are re-running the BICEP deployment, and you have deleted a keyvault,  check you have purged any KeyVaults**
=======


# set up proxies

[https://dev.to/effectory/hosting-an-angular-app-as-a-static-website-with-azure-function-proxies-3m44]

In the web proxy app, add these proxies:

Proxy name | Backend Url
---------- | ------------
root | https://allotmentdevuksweb.z33.web.core.windows.net/
files | https://allotmentdevuksweb.z33.web.core.windows.net/{filename}.{ext}
assets | https://allotmentdevuksweb.z33.web.core.windows.net/assets/{restOfPath}
api | https://allotment-dev-uks-allotment-api.azurewebsites.net/api/{restOfPath}
Rest | https://allotmentdevuksweb.z33.web.core.windows.net/index.html
