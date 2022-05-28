namespace Allotment.DTOs
{
    public class SendGridOptions
    {
        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }
        public string WelcomeEmailTemplateId { get; set; }
        public string ForgottenEmailTemplateId { get; set; }
    }
}
