# Azure Infrastructure

## Resource Group
**Name:** allotment-dev-uks-rg

**Description:** This is the group for the development environment

### Application Insights
**Name:** allotment-dev-uks-app-insights

**Description:** This is the application insights for the development environment

### Function App
**Name:** allotment-dev-uks-allotment-api

**Description:** This function app is for the API 

**URL:** [https://allotment-dev-uks-allotment-api.azurewebsites.net](https://allotment-dev-uks-allotment-api.azurewebsites.net)

Configuration should be from [App Configuration Store]

### Function App 
**Name:** allotment-web-proxy

**Description:** This function app is used as a proxy for the Angular front end in the storage account

**Proxies:**
These proxies will point to the storage account where the Angular website is hosted.
- root : points to 
https://allotmentdevuksweb.z33.web.core.windows.net/
- files : points to https://allotmentdevuksweb.z33.web.core.windows.net/{filename}.{ext}
- assets: https://allotmentdevuksweb.z33.web.core.windows.net/assets/{restOfPath}
- api: 
https://allotment-dev-uks-allotment-api.azurewebsites.net/api/{restOfPath}
- rest: https://allotmentdevuksweb.z33.web.core.windows.net/index.html

### Key Vault 
**Name:** allotment-dev-keyvault

**Description:** This keyvault is for all secure values in the development environment

### sql server 
**Name:** allotment-dev-uks-sql

**Description:** This sql server is for the development environment

### sql database 
**Name:** allotment-dev-uks-sql/allotment

**Description:** This is the development instance of the database

### storage account 
**Name:** allotmentdevuksapistor

**Description:** This storage account is used for the API function app

### storage account 
**Name:** allotmentdevuksweb

**Description:** This storage account is used to host the Angular front-end application

### service plans 

**Description:** various service plans


## Resource Group - allotment-shared-rg

### App Configuration Store 
**Name:** allotment-configurationStore

**Description:** This is a configuration store used for multiple environemnts (Azure only allows 1 free tier per subscription).