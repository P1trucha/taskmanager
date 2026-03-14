"use client";

import { useEffect, useState } from "react";
import { getTasks, type TaskItem } from "../services/api";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Nie udało się pobrać listy zadań.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main
      style={{
        padding: "24px",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh"
      }}
      className="bg-violet-900 text-white"
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Lista zadań</h1>

      {loading && <p>Ładowanie danych...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <TaskList tasks={tasks} />}
    </main>
  );
}