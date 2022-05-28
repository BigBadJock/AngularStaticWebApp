using Allotment.Data.Infrastructure;
using Allotment.Data.Interfaces;
using Allotment.Models;
using Core.Common;
using Microsoft.Extensions.Logging;
using REST_Parser;
using REST_Parser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Allotment.Data.Repositories
{
    public class PlotsWithRentalsViewRepository: BaseReadRepository<PlotsWithRentalsView>, IPlotsWithRentalsViewRepository
    {

        public PlotsWithRentalsViewRepository(AllotmentContext dataContext, IRestToLinqParser<PlotsWithRentalsView> parser, ILogger<IPlotsWithRentalsViewRepository> logger) : base(dataContext, parser, logger)
        {
        }

    }
}
