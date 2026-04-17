using Azure.Identity;
using backend.Data;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Key Vault
var keyVaultUrl = builder.Configuration["KeyVaultUrl"];

if (!string.IsNullOrWhiteSpace(keyVaultUrl))
{
    builder.Configuration.AddAzureKeyVault(
        new Uri(keyVaultUrl),
        new DefaultAzureCredential()
    );
}

// Connection string:
// 1. najpierw z Azure Key Vault (sekret: DbConnectionString)
// 2. fallback do klasycznego ConnectionStrings:DefaultConnection
var connectionString =
    builder.Configuration["DbConnectionString"] ??
    builder.Configuration.GetConnectionString("DefaultConnection");

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Dependency Injection
builder.Services.AddScoped<TaskRepository>();
builder.Services.AddScoped<TaskService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:8080",
                "http://localhost:3000",
                "https://taskmanager-frontend-95269-h0c2g2ezg9gsgsaw.francecentral-01.azurewebsites.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Swagger także na Azure, żeby łatwo testować API
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();