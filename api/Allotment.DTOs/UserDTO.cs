using System;

namespace Allotment.DTOs
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid OrganisationId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

    }
}
