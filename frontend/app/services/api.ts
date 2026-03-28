import axios from "axios";

export type TaskItem = {
  id: number;
  title: string;
  description?: string | null;
  isCompleted: boolean;
};

export type CreateTaskDto = {
  title: string;
  description?: string;
};

export type UpdateTaskDto = {
  title: string;
  description?: string;
  isCompleted: boolean;
};

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");
const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function getTasks(): Promise<TaskItem[]> {
  const response = await api.get<TaskItem[]>("/tasks");
  return response.data;
}

export async function createTask(payload: CreateTaskDto): Promise<TaskItem> {
  const response = await api.post<TaskItem>("/tasks", payload);
  return response.data;
}

export async function updateTask(id: number, payload: UpdateTaskDto): Promise<TaskItem> {
  const response = await api.put<TaskItem>(`/tasks/${id}`, payload);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export default api;