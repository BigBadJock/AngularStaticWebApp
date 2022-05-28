using Core.Common.DataModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class Rental : BaseModel
    {
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        [ForeignKey("Plot")]
        public Guid PlotId { get; set; }
        [ForeignKey("Tenant")]
        public Guid TenantId { get; set; }
        public string Reference { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Cost { get; set; }
        [ForeignKey("PaymentStatus")]
        public Guid PaymentStatusId { get; set; }
        public ICollection<RentalCharge> RentalCharges { get; set; }
        public ICollection<Payment> Payments { get; set; }

        public Rental()
        {
            this.Created = DateTime.Now;
            this.LastUpdated = DateTime.Now;
            this.IsDeleted = false;
            this.Payments = new List<Payment>();
            this.RentalCharges = new List<RentalCharge>();
        }
    }
}
