using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class membershipRespository
    {
        private readonly AppDbContext db;
        public membershipRespository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task Savemembership(membershipplan membership)
        {
            await db.Membership.AddAsync(membership);
            await db.SaveChangesAsync();
        }
        public async Task<List<membershipplan>> getAllMemberships()
        {
            return await db.Membership.ToListAsync();
        }
        public async Task updateMembership(int id, membershipplan mship)
        {
            var membership = await db.Membership.FindAsync(id);
            if(membership==null)
            {
                throw new Exception("Membership Plan not found Record");
            }
            else
            {
                membership.MembershipPlanName = mship.MembershipPlanName;
                membership.Amount = mship.Amount;
                await db.SaveChangesAsync();
            }
        }
        public async Task deleteMembership(int id)
        {
            var membership = await db.Membership.FirstOrDefaultAsync(x => x.Id == id);
            if (membership == null)
            {
                throw new Exception("Membership not Found");
            }
            else
            {
                db.Membership.Remove(membership);
                await db.SaveChangesAsync();
            }

        }

    }
}
