namespace JsonLD.Api.Repositories;

public class Repository : IRepository
{
    private readonly string file = @"Path-to-your-json\People.jsonld";

    public string GetJsonLd()
    {
        var json = File.ReadAllText(this.file);

        return json;
    }

    public void Write(string content)
    {
        File.WriteAllText(this.file, string.Empty);
        File.WriteAllText(this.file, content);
    }
}
