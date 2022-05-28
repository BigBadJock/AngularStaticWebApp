using Core.Common.DataModels;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;

namespace AllotmentFunctions.Helpers
{
    /// <summary>
    ///     Wrapper class for encapsulating claims parsing.
    /// </summary>
    public class AuthenticationInfo
    {
        protected JWTSettings options;
        public bool IsSuperUser { get; set; }
        public bool IsValid { get; }
        public Guid OrganisationId { get; }
        public string UserEmail { get; }



        public AuthenticationInfo(HttpRequest request, JWTSettings options, IConfigurationRoot config)
        {
            this.options = options;
            System.Diagnostics.Debug.WriteLine(config["Jwt:SecretKey"]);
            System.Diagnostics.Debug.WriteLine(config["Jwt:ExpiryMinutes"]);

            // Check if we have a header.
            if (!request.Headers.ContainsKey("Authorization"))
            {
                IsValid = false;

                return;
            }

            string authorizationHeader = request.Headers["Authorization"];

            // Check if the value is empty.
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                IsValid = false;

                return;
            }

            // Check if we can decode the header.
            IDictionary<string, object> claims = null;

            try
            {
                if (authorizationHeader.StartsWith("Bearer"))
                {
                    authorizationHeader = authorizationHeader.Substring(7);
                }
                string secretKey = options.SecretKey;

                // Validate the token and decode the claims.
                claims = new JwtBuilder()
                    .WithAlgorithm(new HMACSHA256Algorithm())
                    .WithSecret(secretKey)
                    .MustVerifySignature()
                    .Decode<IDictionary<string, object>>(authorizationHeader);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                IsValid = false;

                return;
            }

            if (claims.ContainsKey("ORGANISATION"))
            {
                this.OrganisationId = Guid.Parse(claims["ORGANISATION"].ToString());
            }


            if (claims.ContainsKey("SUPERUSER"))
            {
                this.IsSuperUser = true;
            }

            if (claims.ContainsKey("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"))
            {
                this.UserEmail = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"].ToString();
            }

            IsValid = true;
        }

        public AuthenticationInfo(HttpRequest request, JWTSettings options, IConfigurationRoot config, string claim)
        {
            this.options = options;
            System.Diagnostics.Debug.WriteLine(config["Jwt:SecretKey"]);
            System.Diagnostics.Debug.WriteLine(config["Jwt:ExpiryMinutes"]);

            // Check if we have a header.
            if (!request.Headers.ContainsKey("Authorization"))
            {
                IsValid = false;

                return;
            }

            string authorizationHeader = request.Headers["Authorization"];

            // Check if the value is empty.
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                IsValid = false;

                return;
            }

            // Check if we can decode the header.
            IDictionary<string, object> claims = null;

            try
            {
                if (authorizationHeader.StartsWith("Bearer"))
                {
                    authorizationHeader = authorizationHeader.Substring(7);
                }
                string secretKey = options.SecretKey;

                // Validate the token and decode the claims.
                claims = new JwtBuilder()
                    .WithAlgorithm(new HMACSHA256Algorithm())
                    .WithSecret(secretKey)
                    .MustVerifySignature()
                    .Decode<IDictionary<string, object>>(authorizationHeader);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                IsValid = false;

                return;
            }

            if (claims.ContainsKey("ORGANISATION"))
            {
                this.OrganisationId = Guid.Parse(claims["ORGANISATION"].ToString());
            }


            if (!claims.ContainsKey("SUPERUSER"))
            {

                // Check if we have user claim.
                if (!claims.ContainsKey(claim))
                {
                    IsValid = false;

                    return;
                }
            }
            else
            {
                this.IsSuperUser = true;
            }

            if (claims.ContainsKey("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"))
            {
                this.UserEmail = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"].ToString();
            }

            IsValid = true;
        }
    }
}
