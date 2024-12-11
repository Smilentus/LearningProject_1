namespace LearningProject_1.Contracts
{
    public record BooksResponse(
        Guid Id, 
        string Title, 
        string Description, 
        decimal Price
    );
}