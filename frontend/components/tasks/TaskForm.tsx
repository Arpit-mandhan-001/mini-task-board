'use client';

import React, { useState } from 'react';
import { TaskStatusSelect } from './TaskStatusSelect';
import { CreateTaskInput, TaskStatus } from '../../types/task';
import { PlusCircle, Loader2, AlertCircle } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (input: CreateTaskInput) => Promise<void>;
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation: no empty task titles
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a task title (cannot be empty)');
      return;
    }

    setError(null);
    try {
      await onAddTask({ title: trimmedTitle, status });
      setTitle('');
      setStatus('todo');
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
    >
      <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Add New Task
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-slate-200 dark:border-slate-700/60 focus:border-blue-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <TaskStatusSelect
            value={status}
            onChange={setStatus}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-2.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};
