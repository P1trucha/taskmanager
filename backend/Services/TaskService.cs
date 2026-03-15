using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class TaskService
    {
        private readonly TaskRepository _repository;

        public TaskService(TaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TaskItem>> GetAllTasksAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            return await _repository.AddAsync(task);
        }

        public async Task<TaskItem?> UpdateTaskAsync(int id, TaskItem updatedTask)
        {
            return await _repository.UpdateAsync(id, updatedTask);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}