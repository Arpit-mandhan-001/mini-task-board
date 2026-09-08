"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CreateTaskInput, Task, TaskStatus } from "../../types/task";
import { CheckSquare, RefreshCw, AlertTriangle, Layers } from "lucide-react";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate task summary counts
  const totalTasks = tasks.length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* App Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Task Manager
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Organize your daily workflow with real-time status updates
                </p>
              </div>
            </div>
          </div>

          <button
            // onClick={loadTasks}
            disabled={isLoading}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            title="Refresh tasks"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-4 text-red-800 dark:text-red-300 flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Error Occurred</h3>
                <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                  {error}
                </p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-medium underline text-red-700 dark:text-red-400 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {totalTasks}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Total Tasks
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 rounded-lg">
              <span className="text-xs font-bold">📋</span>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {todoCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                To Do
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-lg">
              <span className="text-xs font-bold">⏳</span>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {inProgressCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                In Progress
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg">
              <span className="text-xs font-bold">✅</span>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {doneCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Done</div>
            </div>
          </div>
        </div>

        {/* Task Creation Form */}
        {/* <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} /> */}

        {/* Task List Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
          {/* <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          /> */}
        </div>
      </div>
    </main>
  );
}
