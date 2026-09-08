'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { CreateTaskInput, Task, TaskStatus } from '../types/task';
import { taskService } from '../services/taskService';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { CheckSquare, RefreshCw, AlertTriangle, Layers } from 'lucide-react';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks from backend
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(
        err.message || 'Failed to connect to backend server. Make sure Express & MySQL are running.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Handle task addition with optimistic update
  const handleAddTask = async (input: CreateTaskInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(input);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle status change with optimistic UI update
  const handleStatusChange = async (id: number, newStatus: TaskStatus) => {
    const previousTasks = [...tasks];
    
    // Optimistically update local state
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await taskService.updateTaskStatus(id, newStatus);
    } catch (err: any) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message || 'Failed to update task status');
    }
  };

  // Handle task deletion with optimistic UI update
  const handleDeleteTask = async (id: number) => {
    const previousTasks = [...tasks];

    // Optimistically remove from state
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await taskService.deleteTask(id);
    } catch (err: any) {
      // Rollback on error
      setTasks(previousTasks);
      setError(err.message || 'Failed to delete task');
    }
  };

  // Calculate task summary counts
  const totalTasks = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* App Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md border border-teal-100/90 rounded-3xl p-6 shadow-sm shadow-teal-900/5">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-teal-glow">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  Task Manager
                </h1>
                <p className="text-xs sm:text-sm text-teal-800/70 font-semibold">
                  Organize daily tasks with real-time status tracking
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={loadTasks}
            disabled={isLoading}
            className="self-start sm:self-auto px-4 py-2.5 text-xs font-bold text-teal-700 bg-teal-50/90 hover:bg-teal-100 border border-teal-200/80 rounded-xl transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
            title="Refresh tasks"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Board
          </button>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 flex items-start justify-between gap-3 animate-fadeIn shadow-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold">Connection Warning</h3>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold underline text-red-700 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs transition-all hover:border-slate-300">
            <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl border border-slate-200/60">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{totalTasks}</div>
              <div className="text-[11px] text-slate-500 font-semibold">Total Tasks</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-amber-200/70 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs transition-all hover:border-amber-300">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-200/60">
              <span className="text-xs font-extrabold">📋</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-amber-900">{todoCount}</div>
              <div className="text-[11px] text-amber-700/80 font-semibold">To Do</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-teal-200/80 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs transition-all hover:border-teal-300">
            <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl border border-teal-200/60">
              <span className="text-xs font-extrabold">⚡</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-teal-800">{inProgressCount}</div>
              <div className="text-[11px] text-teal-700/80 font-semibold">In Progress</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-emerald-200/80 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs transition-all hover:border-emerald-300">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200/60">
              <span className="text-xs font-extrabold">✓</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-emerald-800">{doneCount}</div>
              <div className="text-[11px] text-emerald-700/80 font-semibold">Completed</div>
            </div>
          </div>
        </div>

        {/* Task Creation Form */}
        <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />

        {/* Task List Section */}
        <div className="bg-white/90 backdrop-blur-md border border-teal-100/90 rounded-3xl p-5 sm:p-6 shadow-sm shadow-teal-900/5">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </main>
  );
}
