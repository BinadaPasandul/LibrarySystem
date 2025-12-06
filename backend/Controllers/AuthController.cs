using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly JwtService _jwt;

        public AuthController(LibraryContext context, JwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

       // 📝 REGISTER USER
[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] User user)
{
    if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
        return BadRequest(new { message = "❌ Username and Password are required!" });

    string username = user.Username.Trim().ToLower();

    if (_context.Users.Any(u => u.Username.ToLower() == username))
        return BadRequest(new { message = "❌ User already exists!" });

    User newUser = new User()
    {
        Username = user.Username.Trim(),
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password),
        Role = "User"
    };

    _context.Users.Add(newUser);
    await _context.SaveChangesAsync();

    return Ok(new { message = "🎉 User Registered Successfully!" });
}


        [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] User user)
{
    if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
        return BadRequest(new { message = "❌ Username and Password are required!" });

    var dbUser = await _context.Users.FirstOrDefaultAsync(
        u => u.Username.ToLower().Trim() == user.Username.ToLower().Trim()
    );

    if (dbUser == null)
        return Unauthorized(new { message = "❌ Invalid Username!" });

    if (!BCrypt.Net.BCrypt.Verify(user.Password, dbUser.PasswordHash))
        return Unauthorized(new { message = "❌ Invalid Password!" });

    string token = _jwt.GenerateToken(dbUser.Id, dbUser.Username);

    return Ok(new 
    { 
        token, 
        username = dbUser.Username, 
        role = dbUser.Role 
    });
}

    }
}
