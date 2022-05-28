using Core.Common.DataModels;
using System;
using System.Collections.Generic;

namespace Allotment.Models
{
    public class Organisation : BaseModel
    {
        public string Name { get; set; }
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
        public string Settings { get; set; }

        public virtual ICollection<Site> Sites { get; set; }

        public Organisation()
        {
            this.Created = DateTime.Now;
            this.LastUpdated = DateTime.Now;
            this.IsDeleted = false;
            this.Sites = new List<Site>();
        }
    }
}
