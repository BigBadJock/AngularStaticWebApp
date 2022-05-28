using Allotment.Models;
using System.Threading.Tasks;

namespace Allotment.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> BuildAccessToken(User user);
        bool ValidateToken(string accessToken);
        Task<string> GenerateRefreshToken(User user);
        Task<string> RefreshAccessToken(string userName, string refreshTokenString);
    }
}
