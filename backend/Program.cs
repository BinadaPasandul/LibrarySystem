using Microsoft.AspNetCore.Builder;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

// ==============================
// 🔐 JWT Authentication Setup
// ==============================
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
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// 🔐 Register JWT Generator Service
builder.Services.AddScoped<JwtService>();

// ==============================
// 🗂 Database Connection
// ==============================
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db"));

// ==============================
// 📌 Add Controllers
// ==============================
builder.Services.AddControllers();

// ==============================
// 🌐 CORS for React
// ==============================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// ==============================
// 📌 OpenAPI (Swagger, optional)
// ==============================
builder.Services.AddOpenApi(); // if this was in template, keep it

// ==============================
// 🚀 Build App
// ==============================
var app = builder.Build();

// 🌐 Enable CORS
app.UseCors("AllowReactApp");

// 🔐 Enable Auth Middleware (only once)
app.UseAuthentication();
app.UseAuthorization();

// 🚀 Map Controllers
app.MapControllers();

// ==============================
// 🌦 Dummy Test Endpoint (Optional)
// ==============================
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

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
