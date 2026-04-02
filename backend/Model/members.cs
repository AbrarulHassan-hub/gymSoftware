using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gymsoftware.Model
{
    public class members
    {
        [Key]
        public int Id { get; set; }
        public int Code { get; set; }
        public string? Name { get; set; }
        public int PlanId { get; set; }
        public string? PhoneNo { get; set; }
        public DateTime StartDate { get; set; }
        public bool Status { get; set; }
        // Foreign Key
        [ForeignKey("PlanId")]
        // Navigation Property — membershipplan ka data bhi aayega
        public membershipplan? Membershipplan { get; set; }

    }
}
