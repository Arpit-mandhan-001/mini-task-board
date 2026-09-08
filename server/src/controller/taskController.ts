import { NextFunction, Request, Response } from "express";
import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  updateTaskStatus,
  getTaskById as getTaskByIdService,
} from "../services/taskService";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid task ID format" });
      return;
    }
    const task = await getTaskByIdService(id);
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, status } = req.body;
    const newTask = await createNewTask({ title, status });
    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid task ID format" });
      return;
    }

    const { status } = req.body;
    const updatedTask = await updateTaskStatus(id, status);
    res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid task ID format" });
      return;
    }

    await deleteTaskById(id);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
