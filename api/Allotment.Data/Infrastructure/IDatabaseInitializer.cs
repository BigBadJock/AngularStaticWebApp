using Microsoft.EntityFrameworkCore;

namespace Allotment.Data.Infrastructure
{
    public interface IDatabaseInitializer<TContext> where TContext : DbContext
    {
    }
}