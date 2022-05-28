using Core.Common.DataModels;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allotment.Models
{
    public class WaitingListEntry : BaseModel
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
        public string PostCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Sites { get; set; }

    }
}
