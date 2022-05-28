using Microsoft.AspNetCore.Identity;
using System;

namespace Allotment.API.Password
{
    public class PasswordResetTokenProviderOptions : DataProtectionTokenProviderOptions
    {
        public PasswordResetTokenProviderOptions()
        {    //  update the defaults
            Name = "CustomPasswordTokenProvider";
            TokenLifespan = TimeSpan.FromHours(3);

        }
    }
}