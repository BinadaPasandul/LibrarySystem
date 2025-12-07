using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
   
    /// Represents an application user in the Library System.
    /// Stores login details and authorization role.
    
    public class User
    {
       
        /// Primary Key (Auto Increment)
      
        public int Id { get; set; }

       
        /// Username used for login and identification.
       
        public string Username { get; set; } = string.Empty;

       
        ///  Not mapped to Database.
        /// Used only to receive plain password from UI during registration.
        
        [NotMapped]
        public string Password { get; set; } = string.Empty;

        
        ///  Encrypted (Hashed) password stored in database.
        /// Only this value is persisted to DB.
       
        public string? PasswordHash { get; set; }

       
        /// Authorization role (default: "User")
        
       
        public string Role { get; set; } = "User";
    }
}
