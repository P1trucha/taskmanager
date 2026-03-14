import type { TaskItem } from "../services/api";

type TaskListProps = {
  tasks: TaskItem[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "10px",
            background: "#6d28d9"
          }}
        >
          <strong style={{ display: "block", fontSize: "20px" }}>{task.title}</strong>
          {task.description && <p style={{ margin: "8px 0" }}>{task.description}</p>}
          {task.status && <small>Status: {task.status}</small>}
        </li>
      ))}
    </ul>
  );
}