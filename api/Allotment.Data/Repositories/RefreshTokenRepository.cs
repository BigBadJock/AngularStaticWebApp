using Allotment.Data.Infrastructure;
using Core.Common;
using Core.Common.Contracts;
using Core.Common.DataModels;
using Microsoft.Extensions.Logging;
using REST_Parser;

namespace Allotment.Data.Repositories
{
    public class RefreshTokenRepository : BaseRepository<RefreshToken>, IRefreshTokenRepository
    {

        public RefreshTokenRepository(AllotmentContext dataContext, IRestToLinqParser<RefreshToken> parser, ILogger<IRefreshTokenRepository> logger) : base(dataContext, parser, logger)
        {
        }
    }
}
