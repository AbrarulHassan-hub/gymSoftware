using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class EmpPaymentRepository
    {
        public readonly AppDbContext db;
        public EmpPaymentRepository(AppDbContext _db)
        {
            db = _db;
        }
        public async Task AddRecordPayment(EmpPayment emp)
        {
            await db.Epayment.AddAsync(emp);
            await db.SaveChangesAsync();
        }
        public async Task<List<EmpPayment>> ListPyament()
        {
            return await db.Epayment.ToListAsync();

        }
        public async Task updatePayment(int id, EmpPayment emp)
        {
            var payments = await db.Epayment.FindAsync(id);
            if(payments == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                payments.EmpId = emp.EmpId;
                payments.Amount = emp.Amount;
                payments.Date = emp.Date;
                await db.SaveChangesAsync();
            }
        }
        public async Task DeletePayment(int id)
        {
            var payment = await db.Epayment.FindAsync(id);
            if(payment == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                db.Epayment.Remove(payment);
                await db.SaveChangesAsync();

            }
        }
    }
}
