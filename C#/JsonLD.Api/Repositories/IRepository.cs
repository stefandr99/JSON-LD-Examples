namespace JsonLD.Api.Repositories;

public interface IRepository
{
    string GetJsonLd();

    void Write(string content);
}
