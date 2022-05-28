using Core.Common.DataModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class Plot : BaseModel
    {
        public string Name { get; set; }
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        [ForeignKey("Site")]
        public Guid SiteId { get; set; }
        public int Size { get; set; }
        public bool IsCurrentlyRented { get; set; }
        public bool IsUnderOffer { get; set; }
        public bool IsUncultivated { get; set; }

        public virtual ICollection<Rental> Rentals { get; set; }

        public Plot()
        {
            this.Created = DateTime.Now;
            this.LastUpdated = DateTime.Now;
            this.IsDeleted = false;
            this.Rentals = new List<Rental>();
        }
    }
}
