namespace JsonLD.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Services;
using System.Text;

[ApiController]
[Route("[controller]")]
public class ApiController : ControllerBase
{
    private readonly IService service;

    public ApiController(IService service)
    {
        this.service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var jsonLd = this.service.GetCelebrities();

        return this.Ok(jsonLd);
    }

    [HttpPost]
    public async Task<IActionResult> Add()
    {
        using StreamReader reader = new StreamReader(this.Request.Body, Encoding.UTF8);
        var celebrity = await reader.ReadToEndAsync();
        this.service.AddCelebrity(celebrity);

        return this.Ok();
    }
}
