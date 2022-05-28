using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class PlotRentalHistoryViewRepository : BaseReadRepository<PlotRentalHistoryView>, IPlotRentalHistoryViewRepository
    {

        public PlotRentalHistoryViewRepository(AllotmentContext dataContext, IRestToLinqParser<PlotRentalHistoryView> parser, ILogger<IPlotRentalHistoryViewRepository> logger) : base(dataContext, parser, logger)
        {
        }

    }
}
