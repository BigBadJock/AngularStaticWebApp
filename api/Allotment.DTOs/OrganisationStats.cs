using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Allotment.DTOs
{
    public class OrganisationStats
    {
        public Guid OrganisationId { get; set; }
        public int? NoOfSites { get; set; }
        public int? NoOfPlots { get; set; }
        public int? UnletPlots { get; set; }
        public int? UncultivatedPlots { get; set; }
        public int? WaitingList { get; set; }
    }
}
