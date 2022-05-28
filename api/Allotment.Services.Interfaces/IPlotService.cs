using Allotment.Models;
using Core.Common.Contracts;
using Core.Common.DataModels;

namespace Allotment.Services.Interfaces
{
    public interface IPlotService : IDataService<Plot>
    {
        ApiResult<PlotsWithRentalsView> GetPlotsWithRentals(string restQuery);

        ApiResult<PlotRentalHistoryView> GetPlotRentalHistory(string restQuery);
    }
}
