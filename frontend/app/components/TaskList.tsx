import type { TaskItem } from "../services/api";

type TaskListProps = {
  tasks: TaskItem[];
  onEdit: (task: TaskItem) => void;
  onDelete: (task: TaskItem) => void;
  onToggleStatus: (task: TaskItem) => void;
  busyTaskId?: number | null;
};

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleStatus,
  busyTaskId
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✦</div>
        <h3>Brak zadań</h3>
        <p>Dodaj pierwsze zadanie </p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => {
        const isBusy = busyTaskId === task.id;

        return (
          <article key={task.id} className={`task-card ${task.isCompleted ? "task-card--done" : ""}`}>
            <div className="task-card__top">
              <span className={`status-pill ${task.isCompleted ? "status-pill--done" : "status-pill--todo"}`}>
                {task.isCompleted ? "Zakończone" : "Do zrobienia"}
              </span>
              <span className="task-card__id">#{task.id}</span>
            </div>

            <div className="task-card__content">
              <h3>{task.title}</h3>
              <p>{task.description?.trim() ? task.description : "Brak opisu dla tego zadania."}</p>
            </div>

            <div className="task-card__actions">
              <button type="button" className="ghost-btn" onClick={() => onToggleStatus(task)} disabled={isBusy}>
                {task.isCompleted ? "Oznacz jako aktywne" : "Zakończ"}
              </button>
              <button type="button" className="secondary-btn" onClick={() => onEdit(task)} disabled={isBusy}>
                Edytuj
              </button>
              <button type="button" className="danger-btn" onClick={() => onDelete(task)} disabled={isBusy}>
                Usuń
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}