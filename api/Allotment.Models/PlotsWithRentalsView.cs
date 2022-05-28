using Core.Common.DataModels;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class PlotsWithRentalsView: BaseModel
    {
        public string Name { get; set; }
        public Guid OrganisationId { get; set; }
        public Guid SiteId { get; set; }
        public int Size { get; set; }
        public bool IsCurrentlyRented { get; set; }
        public bool IsUnderOffer { get; set; }
        public bool IsUncultivated { get; set; }
        public Guid? TenantId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid? PaymentStatusId { get; set; }
        public string PaymentStatus { get; set; }

    }
}
