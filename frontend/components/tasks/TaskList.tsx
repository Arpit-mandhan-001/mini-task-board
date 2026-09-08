'use client';

import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types/task';
import { TaskItem } from './TaskItem';
import { ListFilter, CheckCircle2, CircleDashed, Clock, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onStatusChange: (id: number, newStatus: TaskStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

type FilterType = 'all' | TaskStatus;

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onStatusChange,
  onDelete,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getCount = (statusType: FilterType) => {
    if (statusType === 'all') return tasks.length;
    return tasks.filter((t) => t.status === statusType).length;
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            All Tasks
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === 'all'
                  ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {getCount('all')}
            </span>
          </button>

          <button
            onClick={() => setFilter('todo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'todo'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CircleDashed className="w-3.5 h-3.5" />
            To Do
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === 'todo'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {getCount('todo')}
            </span>
          </button>

          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'in-progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            In Progress
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === 'in-progress'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
              }`}
            >
              {getCount('in-progress')}
            </span>
          </button>

          <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'done'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Done
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === 'done'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {getCount('done')}
            </span>
          </button>
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/4" />
                </div>
              </div>
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-28" />
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
            {filter === 'all'
              ? 'No tasks found'
              : `No tasks in "${filter}" status`}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            {filter === 'all'
              ? 'Add your first task above to get started organizing your work.'
              : `Change your filter tab or update a task status to see items here.`}
          </p>
        </div>
      ) : (
        /* Task Cards List */
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
