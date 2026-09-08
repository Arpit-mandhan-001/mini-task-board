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
      className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-teal-100/90 shadow-sm shadow-teal-900/5 transition-all duration-200 hover:shadow-teal-sm"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-teal-50 text-teal-700 rounded-xl border border-teal-200/70">
          <PlusCircle className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Create New Task
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Add items to your task queue with instant status allocation
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What needs to be accomplished today?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50/90 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/25 transition-all ${
              error
                ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                : 'border-slate-200/90 focus:border-teal-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <TaskStatusSelect
            value={status}
            onChange={setStatus}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-teal-glow focus:outline-none focus:ring-2 focus:ring-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
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
        <div className="mt-3 text-xs text-red-600 flex items-center gap-1.5 animate-fadeIn bg-red-50 p-2.5 rounded-xl border border-red-200/60">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};
