namespace backend.Models
{
    public class Book
    {
        public int Id { get; set;} //primary key
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category {get; set;}
    }
}