using Core.Common.DataModels;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class RentalCharge : BaseModel
    {
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        [ForeignKey("Rental")]
        public Guid RentalId { get; set; }
        [ForeignKey("ChargeDiscount")]
        public Guid ChargeDiscountId { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }

    }
}
