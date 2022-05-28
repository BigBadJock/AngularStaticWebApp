using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Allotment.DTOs
{
    public class RegistrationCredentials
    {
        [Required]
        [DisplayName("First Name")]
        [StringLength(20, ErrorMessage = "The {0} must be between {2} and  {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} must be between {2} and  {1} characters long.", MinimumLength = 2)]
        [DisplayName("Last Name")]
        public string LastName { get; set; }

        //[Required]
        //[DisplayName("Username")]
        //[StringLength(25, ErrorMessage = "The {0} must be between {2} and {1} characters long")]
        //public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [DisplayName("Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("Password")]
        public string Password { get; set; }

    }
}
