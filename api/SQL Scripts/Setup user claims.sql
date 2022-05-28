SELECT * FROM AspNetUsers
SELECT * FROM Organisations

DECLARE @userId uniqueidentifier	
SELECT @userId = '652d9b41-39d6-4eb7-a99c-0f18e777d5a2'

DECLARE @organisationId uniqueidentifier
SELECT @organisationId = 'B1FDF487-74C3-48B4-D25A-08D86BBD1DA5'

BEGIN tran
UPDATE AspNetUsers SET OrganisationId=@organisationId WHERE id=@userId

DELETE FROM dbo.AspNetUserClaims
INSERT INTO dbo.AspNetUserClaims
(
--Id - column value is auto-generated
UserId, 
ClaimType, 
ClaimValue
)
VALUES
(
-- Id - guid
@userId, -- UserId - nvarchar
N'ORGANISATION', -- ClaimType - nvarchar
@organisationId -- ClaimValue - nvarchar
);


INSERT INTO dbo.AspNetUserClaims
(
    --Id - column value is auto-generated
    UserId,
    ClaimType,
    ClaimValue
)
SELECT @userId, name, name FROM CustomClaimsTypes

--ROLLBACK
--COMMIT