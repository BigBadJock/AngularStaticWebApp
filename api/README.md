# Allotment

## Install EF
dotnet tool install --global dotnet-ef

## Add Migration
dotnet ef migrations add "name"  -c AllotmentContext -p allotment.data -s allotment.api
 
## generate database migration script
dotnet ef migrations script -c AllotmentContext -p allotment.data -s allotment.api -o dbscript.sql --idempotent


## Issues ##
If there are any issues add the **--verbose** tag to help debugging 


