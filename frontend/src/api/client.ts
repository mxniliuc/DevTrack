const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  projectId?: string; // ✅ add this
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks`);
  return response.json();
}

export async function createTask(task: Task): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" });
}