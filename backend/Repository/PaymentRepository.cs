using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class PaymentRepository
    {
        public readonly AppDbContext db;
        public PaymentRepository(AppDbContext _dbContext)
        {
            db = _dbContext;
        }
        public async Task SavePayment(Payment paymentObj)
        {
            await db.Payments.AddAsync(paymentObj);
            await db.SaveChangesAsync();
        }
        public async Task<List<Payment>> getPayment()
        {
            return await db.Payments.ToListAsync();
        }
        public async Task UpdatePayment(int id, Payment ObjPayment)
        {
            var payment = await db.Payments.FindAsync(id);
            if(payment == null)
            {
                throw new Exception("Payment not Found");
            }
            else
            {
                payment.MemberId = ObjPayment.MemberId;
                payment.PaymentType = ObjPayment.PaymentType;
                payment.Amount = ObjPayment.Amount;
                payment.PaymentStatus = ObjPayment.PaymentStatus;
                await db.SaveChangesAsync();
            }
        }
        public async Task DeletePayment(int id)
        {
            var paymentObj = await db.Payments.FirstOrDefaultAsync(m => m.Id == id);
            if(paymentObj == null)
            {
                throw new Exception("Payment not Found");
            }
            else
            {
                db.Payments.Remove(paymentObj);
                await db.SaveChangesAsync();

            }
        }
        public async Task<int> TotalPayment()
        {
            return await db.Payments.CountAsync();
        }

    }
}
