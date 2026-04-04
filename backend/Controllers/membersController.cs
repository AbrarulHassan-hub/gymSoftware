using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class membersController : ControllerBase
    {
        public readonly membersRepository members;
        public membersController(membersRepository m)
        {
            this.members = m;
        }
        [HttpPost]
        public async Task<ActionResult> SaveMembers(members obj)
        {
            await members.SaveMember(obj);
            return Ok(obj);
        }
        [HttpGet]
        public async Task<ActionResult> getListMembers()
        {

            var membersList = await members.getallmembers();
            return Ok(membersList);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> updateMember(int id, members obj)
        {
            await members.updateMembers(id, obj);
            return Ok(members);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteMember(int id)
        {
            await members.Deletemember(id);
            return Ok(members);
        }
        [HttpGet("Countmember")]
        public async Task<ActionResult> ContMember()
        {
            var countMember = await members.CountMember();
            return Ok(countMember);
        }
    }
}
