const API_BASE = "http://localhost:8080/api";

export async function getTasks(projectId?: string) {
  const url = projectId ? `${API_BASE}/tasks?projectId=${projectId}` : `${API_BASE}/tasks`;
  const res = await fetch(url);
  return res.json();
}

export async function createTask(task: any) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(id: string, task: any) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: string) {
  await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
}