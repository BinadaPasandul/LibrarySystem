using Microsoft.AspNetCore.Builder;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

/*=====================================================================
  JWT Authentication Configuration
 ----------------------------------------------------------------------
 This section sets up JSON Web Token authentication for ASP.NET Core.
 It validates:
    ✔ Issuer
    ✔ Audience
    ✔ Lifetime
    ✔ Signing Key (Security)
=====================================================================*/
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],

        // 🔑 Secret key used to sign the JWT token
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        )
    };
});

// Register JWT token generator service
builder.Services.AddScoped<JwtService>();

/*=====================================================================
  Database Configuration (SQLite)
 ----------------------------------------------------------------------
 Uses Entity Framework Core with SQLite. The database file will be 
 created automatically in the project root as `library.db`
=====================================================================*/
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db"));

/*=====================================================================
  Controllers
----------------------------------------------------------------------
 Enables Web API controller support for routing HTTP requests.
=====================================================================*/
builder.Services.AddControllers();

/*=====================================================================
  CORS Policy (Allow React Frontend)
 ----------------------------------------------------------------------
 Allows requests from the React app running at: http://localhost:5173
=====================================================================*/
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

/*=====================================================================
  Swagger (Optional API Documentation)
 ----------------------------------------------------------------------
 Useful during testing development. Keep if available in template.
=====================================================================*/
builder.Services.AddOpenApi();

// ================================================================
//  Build & Configure Middleware Pipeline
// ================================================================
var app = builder.Build();

// Enable CORS for frontend
app.UseCors("AllowReactApp");

// Enable Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map API Controller Routes
app.MapControllers();

/*=====================================================================
  Sample Weather Endpoint (Optional Demo)
 ----------------------------------------------------------------------
 Not part of the assignment, but useful for debugging / testing.
=====================================================================*/
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    return forecast;
})
.WithName("GetWeatherForecast");

// Run Application
app.Run();

/*=====================================================================
  WeatherForecast Record
 ----------------------------------------------------------------------
 Represents response format for the sample API route.
=====================================================================*/
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
