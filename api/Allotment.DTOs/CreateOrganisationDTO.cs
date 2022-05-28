namespace Allotment.DTOs
{
    public class CreateOrganisationDTO
    {
        public string OrganisationName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Locality { get; set; }
        public string TownOrCity { get; set; }
        public string County { get; set; }
        public string District { get; set; }
        public string Country { get; set; }
        public string PostCode { get; set; }
        public string UsersEmail { get; set; }
    }
}
