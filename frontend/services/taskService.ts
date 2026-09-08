import { ApiResponse, CreateTaskInput, Task, TaskStatus } from "../../types/task";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api";

async function handleResponse<T>(response: Response): Promise<T> {
  const json: ApiResponse<T> = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || `HTTP error! status: ${response.status}`);
  }
  return json.data as T;
}

//    Fetch all tasks from backend
export const taskService = {
  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<Task[]>(res);
  },

  //    Create a new task
  async createTask(input: CreateTaskInput): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    return handleResponse<Task>(res);
  },

  //    Update task status
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse<Task>(res);
  },

  //   Delete a task
  async deleteTask(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete task");
    }
  },
};
