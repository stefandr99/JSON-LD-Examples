namespace JsonLD.Api;

using Repositories;
using Services;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddTransient<IRepository, Repository>();
        builder.Services.AddTransient<IService, Service>();

        builder.Services.AddControllers();

        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
