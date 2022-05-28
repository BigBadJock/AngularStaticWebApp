using Core.Common.DataModels;
using System;

namespace Allotment.Models
{
    public class PlotRentalHistoryView : BaseModel
    {
        public Guid OrganisationId { get; set; }
        public Guid PlotId { get; set; }
        public string PlotName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PaymentStatus { get; set; }
        public Guid TenantId { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsCurrent { get; set; }
    }
}
