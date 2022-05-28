using Allotment.DTOs;
using Allotment.Services.Interfaces;
using Ardalis.GuardClauses;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Allotment.Services
{
    public class SendGridService: ISendGridService
    {
        public SendGridService(IOptions<SendGridOptions> optionsAccessor)
        {
            Guard.Against.Null(optionsAccessor, nameof(optionsAccessor));
            Options = optionsAccessor.Value;
        }

        public SendGridOptions Options { get; }



        public Task SendEmailAsync(string emailTemplateId, string emailAddress, string subject, ExpandoObject templateData)
        {
            return Execute(Options.SendGridKey, emailTemplateId, subject, emailAddress, templateData);
        }

        private Task Execute(string apiKey, string emailTemplateId, string subject, string userEmailAddress, ExpandoObject templateData)
        {
            var client = new SendGridClient(apiKey);

            Personalization personalization = new Personalization();

            personalization.TemplateData = templateData;

            var msg = new SendGridMessage();
            //TODO Pick up email address from config
            msg.SetFrom(new EmailAddress("john.mcarthur@silvercode.co.uk", Options.SendGridUser));
            msg.SetTemplateId(emailTemplateId);
            msg.SetSubject(subject);
            msg.Personalizations = new List<Personalization> { personalization };
            msg.AddTo(new EmailAddress(userEmailAddress));


            msg.SetClickTracking(true, true);
            return client.SendEmailAsync(msg);
        }
    }
}
