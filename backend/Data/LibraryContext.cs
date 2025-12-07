using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    
    /// Database context class for the Library System.
    /// Handles interaction with the SQLite database using Entity Framework Core.
    
    public class LibraryContext : DbContext
    {
        
        /// Constructor that passes database configuration to the base DbContext.
        
        
        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }

       
        /// Table representing all library books.
        
        public DbSet<Book> Books { get; set; }

       
        /// Table representing registered users (with hashed passwords).
        
        public DbSet<User> Users { get; set; }
    }
}
