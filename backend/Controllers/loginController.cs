using gymsoftware.Model;
using gymsoftware.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace gymsoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loginController : ControllerBase
    {
        private readonly LoginRepository loginR;
        public loginController(LoginRepository loginRepository)
        {
            loginR = loginRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Login(login obj)
        {
            var users = await loginR.ValidateLogin(obj);
            if (users == null)
            {
                return StatusCode(401, "Wrong Credential");
            }
            else
            {
                return StatusCode(200, users);
            }

        }

    }
}
