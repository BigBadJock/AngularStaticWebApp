using Core.Common.DataModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class Site : BaseModel
    {
        public string Name { get; set; }
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        public int? NumberOfPlots { get; set; }
        public int? UnletPlots { get; set; }
        public int? WaitingList { get; set; }
        public int? PlotsUnderOffer { get; set; }
        public int? UncultivatedPlots { get; set; }
        public int? UnpaidPlots { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal? TotalFees { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal? UnpaidFees { get; set; }
        public ICollection<Plot> Plots { get; set; }

        public Site()
        {
            this.Created = DateTime.Now;
            this.LastUpdated = DateTime.Now;
            this.IsDeleted = false;
            this.Plots = new List<Plot>();
        }
    }
}
