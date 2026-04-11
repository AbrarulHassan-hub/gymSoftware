using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        public readonly ExpenseRepository Expenses;
        public ExpensesController(ExpenseRepository reExp)
        {
            Expenses = reExp;
        }
        [HttpGet]
        public async Task<ActionResult> getAllExpenses()
        {
            var TotalExpenses = await Expenses.ListExpenses();
            return Ok(TotalExpenses);
        }
        [HttpPost]
        public async Task<ActionResult> SaveExpenses(Expenses objExpenses)
        {
            await Expenses.SaveRecord(objExpenses);
            return Ok(objExpenses);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Expenses.DeleteExpense(id);
            return Ok(id);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Expenses objExpenses)
        {
            await Expenses.UpdateExpenses(id, objExpenses);
            return Ok(objExpenses);
        }
    }
}
