namespace backend.Models
{
    
    /// Represents a book record in the Library System.
   
    public class Book
    {
        
        /// Primary key (Auto Increment ID).
        
        public int Id { get; set; }

        
        /// Title of the book.
        
        public string Title { get; set; } = string.Empty;

        
        /// Author who wrote the book.
        
        public string Author { get; set; } = string.Empty;

        
        /// Short description about the book.
               public string Description { get; set; } = string.Empty;

        
        /// Category or genre (e.g., Fiction, Science, Biography).
        
        public string Category { get; set; } = string.Empty;
    }
}
