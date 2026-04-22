using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base (options)
        {

        }
        public DbSet<login> Login { get; set; }
        public DbSet<membershipplan> Membership { get; set; }
        public DbSet<members> Members { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Attendence> Attendences { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<EmpPayment> Epayment { get; set; }
    }
}
