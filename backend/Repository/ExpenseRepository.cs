using gymsoftware.Model;
using gymsoftware.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace gymsoftware.Repository
{
    public class ExpenseRepository
    {
        public readonly AppDbContext db;
        public ExpenseRepository(AppDbContext _db)
        {
            db = _db;
        }
        public async Task SaveRecord(Expenses ExpenseObj)
        {
            await db.Expenses.AddAsync(ExpenseObj);
            await db.SaveChangesAsync();
        }
        public async Task<List<Expenses>> ListExpenses()
        {
            return await db.Expenses.ToListAsync();
        }
        public async Task UpdateExpenses(int id, Expenses expensesObj)
        {
            var expenses = await db.Expenses.FindAsync(id);
            if (expenses == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                expenses.ExpensesTitle = expensesObj.ExpensesTitle;
                expenses.Category = expensesObj.Category;
                expenses.Date = expensesObj.Date;
                expenses.Amount = expensesObj.Amount;
                expenses.PaymentMethod = expensesObj.PaymentMethod;
                expenses.Status = expensesObj.Status;
                await db.SaveChangesAsync();
            }
        }
        public async Task DeleteExpense(int id)
        {
            var expenses = await db.Expenses.FirstOrDefaultAsync(m => m.Id == id);
            if(expenses == null)
            {
                throw new Exception("No Record Found");
            }
            else
            {
                db.Expenses.Remove(expenses);
                await db.SaveChangesAsync();
            }
        }
    }
}
