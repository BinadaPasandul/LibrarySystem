using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        // ❗ This property will NOT get stored in DB, only used for input
        [NotMapped]
        public string Password { get; set; }

        // ✔ Only hashed password will be saved
        public string? PasswordHash { get; set; }

        public string Role { get; set; } = "User";
    }
}
