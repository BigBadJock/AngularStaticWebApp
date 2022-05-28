using Core.Common.DataModels;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class ChargeDiscount : BaseModel
    {
        public enum ChargeDiscountType
        {
            Charge,
            Discount
        }

        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }
        public string Name { get; set; }
        public ChargeDiscountType ChargeOrDiscount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }
        public bool IsPercentage { get; set; }
        public bool IsMultipleOfPlotSize { get; set; }
    }
}
