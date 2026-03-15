using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound(new { message = $"Task with id {id} not found." });

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required." });

            var newTask = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = false
            };

            var createdTask = await _taskService.CreateTaskAsync(newTask);

            return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required." });

            var updatedTask = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted
            };

            var result = await _taskService.UpdateTaskAsync(id, updatedTask);

            if (result == null)
                return NotFound(new { message = $"Task with id {id} not found." });

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _taskService.DeleteTaskAsync(id);

            if (!deleted)
                return NotFound(new { message = $"Task with id {id} not found." });

            return NoContent();
        }
    }
}