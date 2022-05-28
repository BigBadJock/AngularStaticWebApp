using System.Threading.Tasks;

namespace Allotment.Data.Interfaces
{
    public interface ITestStoredProc
    {
        Task<int> ExecuteSP(string name);
    }
}