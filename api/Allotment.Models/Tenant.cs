using Core.Common.DataModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class Tenant : BaseModel
    {
        [ForeignKey("Organisation")]
        public Guid OrganisationId { get; set; }

        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressLine4 { get; set; }
        public string Locality { get; set; }
        public string TownOrCity { get; set; }
        public string County { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string PostCode { get; set; }

        public virtual ICollection<Rental> Rentals { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
