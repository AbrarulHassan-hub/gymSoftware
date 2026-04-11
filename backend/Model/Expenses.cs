namespace gymsoftware.Model
{
    public class Expenses
    {
        public int Id { get; set; }
        public string? ExpensesTitle { get; set; }
        public int Category { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }
        public string? PaymentMethod { get; set; }
        public int Status { get; set; }
    }
}
