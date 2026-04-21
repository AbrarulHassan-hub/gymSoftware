using gymsoftware.Data;
using gymsoftware.Model;
using Microsoft.EntityFrameworkCore;

namespace gymsoftware.Repository
{
    public class EmployeeRespository
    {
        public readonly AppDbContext db;
        public EmployeeRespository(AppDbContext _dbContext)
        {
            db = _dbContext;
        }
        public async Task<List<Employee>> getAllRecordEmp()
        {
            return await db.Employee.ToListAsync();
        }
        public async Task AddEmpRecord(Employee emp)
        {
            await db.Employee.AddAsync(emp);
            await db.SaveChangesAsync();
        }
        public async Task UpdateEmpRecord(int id, Employee emp)
        {
            var Employee = await db.Employee.FindAsync(id);
            if(Employee == null)
            {
                throw new Exception("Employee No Record Found");
            }
            else
            {
                Employee.EmpCode = emp.EmpCode;
                Employee.PhoneNo = emp.PhoneNo;
                Employee.EmpName = emp.EmpName;
                Employee.EmpNIC = emp.EmpNIC;
                Employee.EmpAdress = emp.EmpAdress;
                Employee.status = emp.status;
                await db.SaveChangesAsync();
            }
        }
        public async Task DeleteEmpRecord(int id)
        {
            var Employee = await db.Employee.FirstOrDefaultAsync(m=>m.Id == id);
            if(Employee == null)
            {
                throw new Exception("Employee Record not Found");
            }
            else
            {
                db.Employee.Remove(Employee);
                await db.SaveChangesAsync();
            }

        }
    }
}
