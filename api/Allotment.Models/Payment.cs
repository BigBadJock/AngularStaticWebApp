using Core.Common.DataModels;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class Payment : BaseModel
    {
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        [ForeignKey("Rental")]
        public Guid RentalId { get; set; }
        public DateTime PaymentDate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }
        [ForeignKey("PaymentType")]
        public Guid PaymentTypeId { get; set; }


    }
}
