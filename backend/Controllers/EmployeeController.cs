using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public readonly EmployeeRespository employee;
        public EmployeeController(EmployeeRespository emp)
        {
            employee = emp;
        }
        [HttpGet()]
        public async Task<ActionResult> getAllRecord()
        {
            var empData = await employee.getAllRecordEmp();
            return Ok(empData);
        }
        [HttpPost()]
        public async Task<ActionResult> SaveRecordEmp(Employee emp)
        {
            await employee.AddEmpRecord(emp);
            return Ok(emp);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRecordEmp(int id, Employee emp)
        {
            await employee.UpdateEmpRecord(id, emp);
            return Ok(emp);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRecordEmp(int id)
        {
            await employee.DeleteEmpRecord(id);
            return Ok(id);
        }
    }
}
