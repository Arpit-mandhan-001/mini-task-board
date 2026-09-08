import {
  createTask,
  deleteTask,
  findAll,
  findById,
  updateStatus,
} from '../repository/taskRepository.js';
import { CreateTaskInput, Task, TaskStatus } from '../types/task.js';

// Get all tasks from the database.
export const getAllTasks = async (): Promise<Task[]> => {
  return findAll();
};

// Get a task by ID.
export const getTaskById = async (id: number): Promise<Task> => {
  const task = await findById(id);

  if (!task) {
    const error: any = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  return task;
};

// Create a new task after validating the input.
export const createNewTask = async (
  input: CreateTaskInput
): Promise<Task> => {
  // Remove extra spaces from the task title.
  const trimmedTitle = input.title ? input.title.trim() : '';

  // Make sure the title is not empty.
  if (!trimmedTitle) {
    const error: any = new Error('Task title cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  // Only these statuses are allowed.
  const validStatuses: TaskStatus[] = [
    'todo',
    'in-progress',
    'done',
  ];

  // Use "todo" when no status is provided.
  const status = input.status || 'todo';

  // Validate the task status.
  if (!validStatuses.includes(status)) {
    const error: any = new Error(
      `Invalid status: ${status}. Must be one of: todo, in-progress, done`
    );
    error.statusCode = 400;
    throw error;
  }

  // Create the task in the repository and get the newly created task.
  const newTask = await createTask({
    title: trimmedTitle,
    status,
  });

  return newTask;
};

// Update the status of an existing task.
export const updateTaskStatus = async (
  id: number,
  status: TaskStatus
): Promise<Task> => {
  // Only these statuses are allowed.
  const validStatuses: TaskStatus[] = [
    'todo',
    'in-progress',
    'done',
  ];

  // Validate the new status.
  if (!validStatuses.includes(status)) {
    const error: any = new Error(
      `Invalid status: ${status}. Must be one of: todo, in-progress, done`
    );
    error.statusCode = 400;
    throw error;
  }

  // Update the task in the database.
  const updatedTask = await updateStatus(id, status);

  // Check whether the task exists.
  if (!updatedTask) {
    const error: any = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  return updatedTask;
};

// Delete a task by ID.
export const deleteTaskById = async (id: number): Promise<void> => {
  const deleted = await deleteTask(id);

  // Check whether the task existed.
  if (!deleted) {
    const error: any = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
};
