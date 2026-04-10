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
    }
}
