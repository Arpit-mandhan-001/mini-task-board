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
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-teal-700 text-white shadow-teal-sm'
                : 'text-slate-600 hover:bg-teal-50/80'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            All Tasks
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'all'
                  ? 'bg-teal-800/90 text-teal-100'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {getCount('all')}
            </span>
          </button>

          <button
            onClick={() => setFilter('todo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'todo'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'text-slate-600 hover:bg-teal-50/80'
            }`}
          >
            <CircleDashed className="w-3.5 h-3.5" />
            To Do
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'todo'
                  ? 'bg-slate-950 text-slate-200'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {getCount('todo')}
            </span>
          </button>

          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'in-progress'
                ? 'bg-teal-600 text-white shadow-teal-glow'
                : 'text-slate-600 hover:bg-teal-50/80'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            In Progress
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'in-progress'
                  ? 'bg-teal-800 text-teal-100'
                  : 'bg-teal-100/90 text-teal-800'
              }`}
            >
              {getCount('in-progress')}
            </span>
          </button>

          <button
            onClick={() => setFilter('done')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'done'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-teal-50/80'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Done
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'done'
                  ? 'bg-emerald-800 text-emerald-100'
                  : 'bg-emerald-100/90 text-emerald-800'
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
              className="animate-pulse bg-white border border-teal-100/90 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <div className="w-7 h-7 bg-teal-100/60 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-md w-1/4" />
                </div>
              </div>
              <div className="h-8 bg-slate-200 rounded-xl w-28" />
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        /* Empty State */
        <div className="bg-white/70 border border-dashed border-teal-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 border border-teal-200/80">
            <Sparkles className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {filter === 'all'
              ? 'No tasks found'
              : `No tasks in "${filter}" status`}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            {filter === 'all'
              ? 'Your task list is clear! Create a new task above to stay productive.'
              : `Try switching filter categories or update task statuses.`}
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
