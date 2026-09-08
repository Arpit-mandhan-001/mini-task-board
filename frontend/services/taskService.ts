import { ApiResponse, CreateTaskInput, Task, TaskStatus } from "../types/task";

// Backend API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api";

// Common function to handle API responses

// checks whether the request was successful and returns the actual data
async function handleResponse<T>(response: Response): Promise<T> {
  // Convert the response into JSON
  const json: ApiResponse<T> = await response.json();

  // If request failed or backend returned success: false, throw an error
  if (!response.ok || !json.success) {
    throw new Error(json.error || `HTTP error! status: ${response.status}`);
  }

  // Return the data received from the backend
  return json.data as T;
}

export const taskService = {
  // Fetch all tasks from the backend
  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      // Don't use cached data; always get the latest tasks
      cache: "no-store",

      // Tell the backend that we are working with JSON
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response and return the list of tasks
    return handleResponse<Task[]>(res);
  },

  // Create a new task
  async createTask(input: CreateTaskInput): Promise<Task> {
    // Send the task data to the backend using POST
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",

      // Tell backend that the request body contains JSON
      headers: {
        "Content-Type": "application/json",
      },

      // Convert the input task object into JSON
      body: JSON.stringify(input),
    });

    // Handle the response and return the newly created task
    return handleResponse<Task>(res);
  },

  // Update the status of an existing task
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    // Send the new status to the backend using PATCH
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: "PATCH",

      // Tell the backend that the request body contains JSON
      headers: {
        "Content-Type": "application/json",
      },

      // Send the new status as JSON
      body: JSON.stringify({ status }),
    });

    // Handle the response and return the updated task
    return handleResponse<Task>(res);
  },

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    // Send a DELETE request for the selected task
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",

      // Tell the backend that the request uses JSON
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Convert the backend response into JSON
    const json = await res.json();

    // If the delete request failed, show an error
    if (!res.ok || !json.success) {
      throw new Error(json.error || "Failed to delete task");
    }
  },
};
