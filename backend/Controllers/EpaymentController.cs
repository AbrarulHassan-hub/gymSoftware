using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpaymentController : ControllerBase
    {
        public readonly EmpPaymentRepository Epayment;
        public EpaymentController(EmpPaymentRepository e)
        {
            Epayment = e;
        }
        [HttpGet()]
        public async Task<ActionResult> ListPayment()
        {
            var payment =await Epayment.ListPyament();
            return Ok(payment);
        }
        [HttpPost()]
        public async Task<ActionResult> AddPayment(EmpPayment payment)
        {
            await Epayment.AddRecordPayment(payment);
            return Ok(payment);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> updatePayment(int id, EmpPayment payment)
        {
            await Epayment.updatePayment(id, payment);
            return Ok(payment);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> deletePyament(int id)
        {
            await Epayment.DeletePayment(id);
            return Ok(id);
        }

    }
}
