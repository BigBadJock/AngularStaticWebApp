using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class RentalRepository : BaseRepository<Rental>, IRentalRepository
    {
        public RentalRepository(AllotmentContext dataContext, IRestToLinqParser<Rental> parser, ILogger<IRentalRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
