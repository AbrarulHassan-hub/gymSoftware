using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public readonly PaymentRepository payment;
        public PaymentController(PaymentRepository pay)
        {
            payment = pay;
        }
        [HttpGet]
        public async Task<ActionResult> getlistPayment()
        {
            var getpayment = await payment.getPayment();
            return Ok(getpayment);
        }
        [HttpPost]
        public async Task<ActionResult> SavePayment(Payment objPayment)
        {
            await payment.SavePayment(objPayment);
            return Ok(objPayment);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePayment(int id)
        {
            await payment.DeletePayment(id);
            return Ok(payment);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePyament(int id,Payment objPayment)
        {
            await payment.UpdatePayment(id, objPayment);
            return Ok(payment);
        }
        [HttpGet("CountPayment")]
        public async Task<ActionResult> TotalPayment()
        {
            var totalpayment = await payment.TotalPayment();
            return Ok(totalpayment);
        }
    }
}
