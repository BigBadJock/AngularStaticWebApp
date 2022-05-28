namespace Allotment.DTOs
{
    public class ResetPasswordCredentials
    {
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public string ResetPasswordToken { get; set; }
    }
}
