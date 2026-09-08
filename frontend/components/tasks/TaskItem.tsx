'use client';

import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types/task';
import { TaskStatusSelect, statusConfig } from './TaskStatusSelect';
import { Trash2, Calendar, CheckCircle2, Clock, CircleDashed, Loader2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, newStatus: TaskStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusUpdate = async (newStatus: TaskStatus) => {
    if (newStatus === task.status) return;
    setIsUpdating(true);
    try {
      await onStatusChange(task.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'done':
        return (
          <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'in-progress':
        return (
          <div className="p-1.5 bg-teal-50 rounded-lg text-teal-600 border border-teal-200/80">
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
        );
      case 'todo':
      default:
        return (
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500 border border-slate-200">
            <CircleDashed className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div
      className={`group bg-white backdrop-blur border border-slate-200/80 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-teal-sm hover:border-teal-300 ${
        task.status === 'done' ? 'opacity-75 bg-slate-50/60' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left column: Icon & Title */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="mt-0.5 flex-shrink-0">
            {isUpdating ? (
              <div className="p-1.5 bg-teal-50 rounded-lg border border-teal-200/80">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
              </div>
            ) : (
              getStatusIcon(task.status)
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm sm:text-base font-semibold leading-snug break-words transition-all ${
                task.status === 'done'
                  ? 'line-through text-slate-400 font-normal'
                  : 'text-slate-900'
              }`}
            >
              {task.title}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created {formatDate(task.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Right column: Status Selector & Delete Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <TaskStatusSelect
            value={task.status}
            onChange={handleStatusUpdate}
            disabled={isUpdating || isDeleting}
            size="sm"
          />

          <button
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
            title="Delete task"
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
