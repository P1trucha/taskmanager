import axios from "axios";

export type TaskItem = {
  id: number;
  title: string;
  description?: string;
  status?: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const mockTasks: TaskItem[] = [
  {
    id: 1,
    title: "Przygotować Artefakt 3",
    description: "Stworzyć działającą warstwę prezentacji",
    status: "todo",
  },
  {
    id: 2,
    title: "Zaktualizować README",
    description: "Dodać opis frontendu i Dockerfile",
    status: "done",
  },
  {
    id: 3,
    title: "Uruchomić front w Dockerze",
    description: "Sprawdzić działanie pod localhost:8080",
    status: "todo",
  },
];

export async function getTasks(): Promise<TaskItem[]> {
  try {
    const response = await api.get<TaskItem[]>("/tasks");
    return response.data;
  } catch (error) {
    console.warn("API niedostępne, używam danych mockowanych.", error);

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500);
    });
  }
}

export default api;