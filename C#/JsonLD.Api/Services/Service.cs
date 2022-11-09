namespace JsonLD.Api.Services;

using JsonLD.Core;
using Newtonsoft.Json.Linq;
using Repositories;

public class Service : IService
{
    private readonly IRepository repository;
    private const string KeyMember = "http://schema.org/member";
    private const string Context = "{'@context': {'@vocab': 'http://schema.org/'}}";

    public Service(IRepository repository)
    {
        this.repository = repository;
    }

    public string GetCelebrities()
    {
        var json = this.repository.GetJsonLd();

        var doc = JObject.Parse(json);
        var contextObj = JObject.Parse(Context);
        var opts = new JsonLdOptions();
        var compacted = JsonLdProcessor.Compact(doc, contextObj, opts);

        return compacted.ToString();
    }

    public void AddCelebrity(string celebrity)
    {
        var celebrityJson = JObject.Parse(celebrity);
        var expanded = JsonLdProcessor.Expand(celebrityJson)[0]!;

        var json = this.repository.GetJsonLd();
        var celebritiesJson = JObject.Parse(json);
        var members = celebritiesJson.GetValue(KeyMember);
        members[0].AddAfterSelf(expanded);

        celebritiesJson[KeyMember] = members;
        this.repository.Write(celebritiesJson.ToString());
    }
}
