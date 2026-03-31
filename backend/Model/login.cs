using System.ComponentModel.DataAnnotations;

namespace gymsoftware.Model
{
    public class login
    {
        [Key]
        public int Id { get; set; }
        public required string name { get; set; }
        public required string password { get; set; }
    }
}
