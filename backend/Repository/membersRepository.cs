using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class membersRepository
    {
        private readonly AppDbContext db;
        public membersRepository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task SaveMember(members m)
        {
            await db.Members.AddAsync(m);
            await db.SaveChangesAsync();
        }
        public async Task<List<members>> getallmembers()
        {
            return await db.Members.ToListAsync();
        }
        public async Task updateMembers(int id, members obj)
        {
            var member = await db.Members.FindAsync(id);
            if (member == null)
            {
                throw new Exception("Member not found");
            }
            else
            {
                member.Code = obj.Code;
                member.Name = obj.Name;
                member.PlanId = obj.PlanId;
                member.PhoneNo = obj.PhoneNo;
                member.StartDate = obj.StartDate;
                member.Status = obj.Status;
                await db.SaveChangesAsync();
            }
        }
        public async Task Deletemember(int id)
        {
            var memberIsValid = await db.Members.FirstOrDefaultAsync(m => m.Id == id);
            if(memberIsValid == null)
            {
                throw new Exception("No found Member");
            }
            else
            {
                db.Members.Remove(memberIsValid);
                await db.SaveChangesAsync();
            }
        }
        public async Task<int> CountMember()
        {
            return await db.Members.CountAsync();
        }

    }
}
