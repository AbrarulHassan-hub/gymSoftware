using System.ComponentModel.DataAnnotations.Schema;

namespace gymsoftware.Model
{
    public class Attendence
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string? Attendences { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("MemberId")]
        public members? MemberName { get; set; }
    }
}
