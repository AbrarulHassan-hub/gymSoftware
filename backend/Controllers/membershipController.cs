using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class membershipController : ControllerBase
    {
        private readonly membershipRespository membership;
        public membershipController(membershipRespository memberRepository)
        {
            membership = memberRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Addmembership(membershipplan mplan)
        {
            await membership.Savemembership(mplan);
            return Ok(mplan);
        }
        [HttpGet]
        public async Task<ActionResult> membershipList()
        {
            var allmembership = await membership.getAllMemberships();
            return Ok(allmembership);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> updateMemberShip(int id, [FromForm] membershipplan memberships)
        {
            await membership.updateMembership(id, memberships);
            return Ok(membership);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMemberships(int id)
        {
            await membership.deleteMembership(id);
            return Ok();
        }
    }
}
