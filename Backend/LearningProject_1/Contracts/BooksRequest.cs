namespace LearningProject_1.Contracts
{
    public record BooksRequest(
        string Title,
        string Description,
        decimal Price
    );
}
