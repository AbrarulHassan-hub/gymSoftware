using System;
using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class LoginRepository
    {
        private readonly AppDbContext db;
        public LoginRepository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task<login?> ValidateLogin(login lg)
        {
            return await db.Login.SingleOrDefaultAsync(u => u.name == lg.name && u.password == lg.password);
        }
    }
}
