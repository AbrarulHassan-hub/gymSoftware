using System.ComponentModel.DataAnnotations.Schema;

namespace gymsoftware.Model
{
    public class Payment
    {
        public int Id {get;set;}
        public int MemberId { get; set; }
        public string? PaymentType { get; set; }
        public int Amount { get; set; }
        public string? PaymentStatus { get; set; }
        [ForeignKey("MemberId")]
        public members? MemberName { get; set; }
    }
}
