using Core.Common.DataModels;
using System;

namespace Allotment.Models
{
    public class User : BaseUser
    {
        public Guid OrganisationId { get; set; }
    }
}
