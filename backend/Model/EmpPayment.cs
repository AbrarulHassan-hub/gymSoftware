using System.ComponentModel.DataAnnotations.Schema;

namespace gymsoftware.Model
{
    public class EmpPayment
    {
        public int Id { get; set; }
        public int EmpId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("EmpId")]
        public Employee? Employees { get; set; }
    }
}
