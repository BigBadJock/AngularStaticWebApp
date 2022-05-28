using System.Threading.Tasks;

namespace Allotment.Data.Interfaces
{
    public interface IAllotmentDbInitialiser
    {
        Task Initialise(IDbContext context);
    }
}
