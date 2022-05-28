using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class WaitingListRepository : BaseRepository<WaitingListEntry>, IWaitingListRepository
    {
        public WaitingListRepository(AllotmentContext dataContext, IRestToLinqParser<WaitingListEntry> parser, ILogger<IWaitingListRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
