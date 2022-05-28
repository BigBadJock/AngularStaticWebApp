/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[IsDeleted]
      ,[Created]
      ,[LastUpdated]
      ,[LastUpdatedBy]
      ,[Name]
  FROM [Allotment].[dbo].[CustomClaimsTypes]

select * from AspNetUserClaims

insert into aspnetuserclaims (userid, ClaimType, ClaimValue) 
select 'e398649e-e700-4b37-aef3-8954b26268ba', name, name 
from customclaimstypes

insert into aspnetuserclaims (userid, ClaimType, ClaimValue) 
values('e398649e-e700-4b37-aef3-8954b26268ba', 'ORGANISATION', '1')
