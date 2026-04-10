using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class AttendenceRepository
    {
        public readonly AppDbContext db;
        public AttendenceRepository(AppDbContext _dbContext)
        {
            db = _dbContext;
        }
        public async Task<List<Attendence>> getAttendence()
        {
            return await db.Attendences.ToListAsync();
        }
        public async Task SaveAttendence(Attendence ObjAttendence)
        {
            await db.Attendences.AddAsync(ObjAttendence);
            await db.SaveChangesAsync();
        }
        public async Task UpdateAttendence(int id, Attendence objAttendence)
        {
            var IsAttendence = await db.Attendences.FindAsync(id);
            if(IsAttendence == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                IsAttendence.MemberId = objAttendence.MemberId;
                IsAttendence.Attendences = objAttendence.Attendences;
                IsAttendence.Date = objAttendence.Date;
                await db.SaveChangesAsync();
            }
        }
        public async Task DeleteAttendence(int id)
        {
            var IsAttendence = await db.Attendences.FirstOrDefaultAsync(m => m.Id == id);
            if(IsAttendence == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                db.Attendences.Remove(IsAttendence);
                await db.SaveChangesAsync();
            }
        }
        public async Task<int> TotalAttendence()
        {
            var today = DateTime.Today;

            return await db.Attendences
                .Where(a => a.Date >= today
                         && a.Date < today.AddDays(1)
                         && a.Attendences == "Present")
                .CountAsync();
        }
    }
}
