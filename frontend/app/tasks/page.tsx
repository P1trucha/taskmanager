"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import TaskList from "../components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  type TaskItem,
  updateTask
} from "../services/api";

type FormState = {
  title: string;
  description: string;
};

const emptyForm: FormState = {
  title: "",
  description: ""
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const stats = useMemo(() => {
    const done = tasks.filter((task) => task.isCompleted).length;
    const todo = tasks.length - done;

    return {
      all: tasks.length,
      done,
      todo
    };
  }, [tasks]);

  async function loadTasks() {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Nie udało się pobrać danych z backendu. Sprawdź czy API działa na porcie 8081.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTasks();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingTask(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const title = form.title.trim();
    const description = form.description.trim();

    if (!title) {
      setError("Tytuł zadania jest wymagany.");
      return;
    }

    try {
      setSubmitting(true);

      if (editingTask) {
        await updateTask(editingTask.id, {
          title,
          description,
          isCompleted: editingTask.isCompleted
        });
        setNotice(`Zadanie #${editingTask.id} zostało zaktualizowane.`);
      } else {
        await createTask({
          title,
          description
        });
        setNotice("Nowe zadanie zostało dodane.");
      }

      resetForm();
      await loadTasks();
    } catch {
      setError("Operacja nie powiodła się. Backend najwyraźniej postanowił znów sprawdzić twoją cierpliwość.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(task: TaskItem) {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description ?? ""
    });
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(task: TaskItem) {
    const confirmed = window.confirm(`Usunąć zadanie „${task.title}”?`);
    if (!confirmed) {
      return;
    }

    try {
      setBusyTaskId(task.id);
      setError("");
      setNotice("");
      await deleteTask(task.id);
      if (editingTask?.id === task.id) {
        resetForm();
      }
      setNotice(`Zadanie #${task.id} zostało usunięte.`);
      await loadTasks();
    } catch {
      setError("Nie udało się usunąć zadania.");
    } finally {
      setBusyTaskId(null);
    }
  }

  async function handleToggleStatus(task: TaskItem) {
    try {
      setBusyTaskId(task.id);
      setError("");
      setNotice("");
      await updateTask(task.id, {
        title: task.title,
        description: task.description ?? "",
        isCompleted: !task.isCompleted
      });
      setNotice(
        !task.isCompleted
          ? `Zadanie #${task.id} oznaczono jako zakończone.`
          : `Zadanie #${task.id} wróciło do aktywnych.`
      );
      await loadTasks();
    } catch {
      setError("Nie udało się zmienić statusu zadania.");
    } finally {
      setBusyTaskId(null);
    }
  }

  return (
    <main className="dashboard-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Task Manager CRUD</p>
          <h1> panel artefakt nr 5</h1>
          <p className="hero-copy">
          CRUD - Test działania
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Wszystkie</span>
            <strong>{stats.all}</strong>
          </div>
          <div className="stat-card">
            <span>Aktywne</span>
            <strong>{stats.todo}</strong>
          </div>
          <div className="stat-card">
            <span>Zakończone</span>
            <strong>{stats.done}</strong>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <section className="panel-card panel-card--form">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Formularz</p>
              <h2>{editingTask ? `Edycja zadania #${editingTask.id}` : "Dodaj nowe zadanie"}</h2>
            </div>
            {editingTask && (
              <button type="button" className="ghost-btn" onClick={resetForm}>
                Anuluj edycję
              </button>
            )}
          </div>

          <form className="task-form" onSubmit={handleSubmit}>
            <label>
              <span>Tytuł</span>
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Np. Przygotować screeny do artefaktu"
                maxLength={200}
              />
            </label>

            <label>
              <span>Opis</span>
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Krótki opis zadania albo plan działania"
                rows={5}
              />
            </label>

            <button type="submit" className="primary-btn" disabled={submitting}>
              {submitting ? "Zapisywanie..." : editingTask ? "Zapisz zmiany" : "Dodaj zadanie"}
            </button>
          </form>

          {error && <div className="message-box message-box--error">{error}</div>}
          {notice && <div className="message-box message-box--success">{notice}</div>}
        </section>

        <section className="panel-card">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Lista zadań</p>
              <h2>Widok CRUD</h2>
            </div>
            <button type="button" className="ghost-btn" onClick={() => void loadTasks()}>
              Odśwież
            </button>
          </div>

          {loading ? (
            <div className="loading-box">Ładowanie danych z API...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={startEdit}
              onDelete={(task) => void handleDelete(task)}
              onToggleStatus={(task) => void handleToggleStatus(task)}
              busyTaskId={busyTaskId}
            />
          )}
        </section>
      </section>
    </main>
  );
}