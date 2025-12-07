using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        
        //  PUBLIC ENDPOINTS (Anyone can view books)
       

        // Get all books, optionally filter by category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks([FromQuery] string? category = null)
        {
            // Apply filtering only if category is provided
            if (!string.IsNullOrEmpty(category))
            {
                return await _context.Books
                    .Where(b => b.Category == category)
                    .ToListAsync();
            }

            return await _context.Books.ToListAsync();
        }

        // Get a single book by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound(); // If book not found return 404

            return book;
        }

       
        //  PROTECTED ENDPOINTS (Require Login to Modify Data)
        

        // Add a new book
        [Authorize]  // Requires JWT token to access
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);     // Add to EF Core tracking
            await _context.SaveChangesAsync();  // Save changes to database

            // Return 201 created + location of the new book
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // Edit an existing book
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            // The URL id must match the book object's ID
            if (id != book.Id) return BadRequest("Book ID mismatch");

            _context.Entry(book).State = EntityState.Modified; // Mark entity as modified

            try
            {
                await _context.SaveChangesAsync(); // Try saving updates
            }
            catch (DbUpdateConcurrencyException)
            {
                // If the book no longer exists, return 404
                if (!_context.Books.Any(b => b.Id == id)) return NotFound();

                throw; 
            }

            return NoContent(); 
        }

        // Delete a book
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound(); // If no book found, return 404

            _context.Books.Remove(book);         // Remove from DB
            await _context.SaveChangesAsync();   // Commit deletion

            return NoContent(); // Successfully deleted
        }
    }
}
