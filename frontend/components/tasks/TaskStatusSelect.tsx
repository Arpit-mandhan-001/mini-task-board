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
    bg: "bg-slate-100/90",
    text: "text-slate-700",
    border: "border-slate-200/90",
    badgeBg: "bg-slate-100 text-slate-700",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200/90",
    badgeBg: "bg-teal-100/80 text-teal-800",
  },
  done: {
    label: "Done",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200/90",
    badgeBg: "bg-emerald-100/80 text-emerald-800",
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
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskStatus)}
        disabled={disabled}
        className={`font-semibold rounded-xl transition-all border cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
          currentConfig.bg
        } ${currentConfig.text} ${currentConfig.border} ${
          size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xs"}`}
      >
        <option value="todo" className="bg-white text-slate-800">
          📋 To Do
        </option>
        <option value="in-progress" className="bg-white text-slate-800">
          ⚡ In Progress
        </option>
        <option value="done" className="bg-white text-slate-800">
          ✓ Done
        </option>
      </select>
    </div>
  );
};
