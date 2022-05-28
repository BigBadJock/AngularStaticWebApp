using System.Dynamic;
using System.Threading.Tasks;

namespace Allotment.Services.Interfaces
{
    public interface ISendGridService
    {
        Task SendEmailAsync(string emailTemplateId, string emailAddress, string subject, ExpandoObject templateData);
    }
}
