using System.ComponentModel.DataAnnotations;

namespace gymsoftware.Model
{
    public class membershipplan
    {
        [Key]
        public int Id { get; set; }
        public string? MembershipPlanName {get;set;}
        public string? Duration { get; set; }
        public int Amount { get;set; }
    }
}
