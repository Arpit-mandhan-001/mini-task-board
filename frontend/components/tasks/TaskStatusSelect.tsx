"use client";

import React from "react";
import { TaskStatus } from "../../types/task";

interface TaskStatusSelectProps {
  value: TaskStatus;
  onChange: (newStatus: TaskStatus) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export const statusConfig: Record<
  TaskStatus,
  { label: string; bg: string; text: string; border: string; badgeBg: string }
> = {
  todo: {
    label: "To Do",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/50",
    badgeBg:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/50",
    badgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300",
  },
  done: {
    label: "Done",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
    badgeBg:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300",
  },
};

export const TaskStatusSelect: React.FC<TaskStatusSelectProps> = ({
  value,
  onChange,
  disabled = false,
  size = "md",
}) => {
  const currentConfig = statusConfig[value];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
      disabled={disabled}
      className={`font-medium rounded-lg transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
        currentConfig.bg
      } ${currentConfig.text} ${currentConfig.border} ${
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-2 text-sm"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
    >
      <option value="todo">📋 To Do</option>
      <option value="in-progress">⏳ In Progress</option>
      <option value="done">✅ Done</option>
    </select>
  );
};
