using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class PlotRepository : BaseRepository<Plot>, IPlotRepository
    {
        public PlotRepository(AllotmentContext dataContext, IRestToLinqParser<Plot> parser, ILogger<IPlotRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
