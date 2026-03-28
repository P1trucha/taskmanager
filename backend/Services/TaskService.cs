using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskReadDto>> GetAllAsync()
        {
            return await _context.Tasks
                .Select(t => new TaskReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted
                })
                .ToListAsync();
        }

        public async Task<TaskReadDto?> GetByIdAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) return null;

            return new TaskReadDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };
        }

        public async Task<TaskReadDto> CreateAsync(TaskCreateDto dto)
        {
            var task = new TaskEntity
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = false
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskReadDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };
        }

        public async Task<TaskReadDto?> UpdateAsync(int id, TaskUpdateDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) return null;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;

            await _context.SaveChangesAsync();

            return new TaskReadDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}