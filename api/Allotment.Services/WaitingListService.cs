using Allotment.Data.Interfaces;
using Allotment.Models;
using Allotment.Services.Interfaces;
using Core.Common;
using Microsoft.Extensions.Logging;

namespace Allotment.Services
{
    public class WaitingListService : BaseDataService<WaitingListEntry>, IWaitingListService
    {

        public WaitingListService(IWaitingListRepository repository, ILogger<WaitingListEntry> logger) : base(repository, logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

    }
}
