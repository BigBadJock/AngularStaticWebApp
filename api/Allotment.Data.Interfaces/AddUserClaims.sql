/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[UserId]
      ,[ClaimType]
      ,[ClaimValue]
  FROM [Allotment].[dbo].[AspNetUserClaims]


insert into [Allotment].[dbo].[AspNetUserClaims]
(userId, ClaimType, ClaimValue)
select '838f9e00-0be8-435c-a681-c32e6e18f9f3', [name], [name]
  FROM [Allotment].[dbo].[CustomClaimsTypes]


insert into [Allotment].[dbo].[AspNetUserClaims]
(userId, ClaimType, ClaimValue)
values ('838f9e00-0be8-435c-a681-c32e6e18f9f3', 'ORGANISATION', 'F35BEF85-2BAA-4599-358E-08D8CAD8A125')