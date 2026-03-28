using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class TaskUpdateDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool IsCompleted { get; set; }
    }
}