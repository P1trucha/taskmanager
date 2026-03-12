import type { TaskItem } from "../services/api";

type TaskListProps = {
  tasks: TaskItem[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "12px" }}>
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
          {task.status && <small>Status: {task.status}</small>}
        </li>
      ))}
    </ul>
  );
}