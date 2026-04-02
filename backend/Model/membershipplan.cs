using System.ComponentModel.DataAnnotations;

namespace gymsoftware.Model
{
    public class membershipplan
    {
        [Key]
        public int id { get; set; }
        public string? code { get;set;}
        public string? name { get; set; }
        public string? duration { get; set; }
        public int amount { get;set; }
    }
}
