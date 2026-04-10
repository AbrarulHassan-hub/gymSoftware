using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {
        public readonly AttendenceRepository attendence;
        public AttendenceController(AttendenceRepository at)
        {
            attendence = at;
        }
        [HttpGet()]
        public async Task<ActionResult> ListAttendence()
        {
            var listData = await attendence.getAttendence();
            return Ok(listData);
        }
        [HttpPost()]
        public async Task<ActionResult> SaveAttendence(Attendence attendenceObj)
        {
            await attendence.SaveAttendence(attendenceObj);
            return Ok(attendenceObj);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAttendence(int id, [FromBody] Attendence attendenceObj)
        {
            await attendence.UpdateAttendence(id, attendenceObj);
            return Ok(attendenceObj);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAttendence(int id)
        {
            await attendence.DeleteAttendence(id);
            return Ok(attendence);
        }

    }
}
