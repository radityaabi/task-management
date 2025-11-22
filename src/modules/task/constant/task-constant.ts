import type { TaskPriority, TaskStatus } from "@/modules/task/types/task";

export const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const STATUS_WEIGHT: Record<TaskStatus, number> = {
  "in-progress": 2,
  todo: 1,
  done: 0,
};

export const CATEGORY_CONFIG = {
  Work: {
    bgColor: "bg-blue-700",
    progress: "bg-blue-500",
    progressBgColor: "bg-blue-100",
  },
  Personal: {
    bgColor: "bg-purple-700",
    progress: "bg-purple-500",
    progressBgColor: "bg-purple-100",
  },
  Study: {
    bgColor: "bg-green-700",
    progress: "bg-green-500",
    progressBgColor: "bg-green-100",
  },
  Health: {
    bgColor: "bg-red-700",
    progress: "bg-red-500",
    progressBgColor: "bg-red-100",
  },
  Finance: {
    bgColor: "bg-emerald-700",
    progress: "bg-emerald-500",
    progressBgColor: "bg-emerald-100",
  },
  Shopping: {
    bgColor: "bg-orange-700",
    progress: "bg-orange-500",
    progressBgColor: "bg-orange-100",
  },
  Projects: {
    bgColor: "bg-indigo-700",
    progress: "bg-indigo-500",
    progressBgColor: "bg-indigo-100",
  },
  Events: {
    bgColor: "bg-pink-700",
    progress: "bg-pink-500",
    progressBgColor: "bg-pink-100",
  },
  Goals: {
    bgColor: "bg-teal-700",
    progress: "bg-teal-500",
    progressBgColor: "bg-teal-100",
  },
  Others: {
    bgColor: "bg-gray-700",
    progress: "bg-gray-500",
    progressBgColor: "bg-gray-100",
  },
};

export const PRIORITY_CONFIG = {
  high: {
    label: "High",
    textColor: "text-white",
    bgColor: "bg-red-600",
  },
  medium: {
    label: "Medium",
    textColor: "text-black",
    bgColor: "bg-amber-400",
  },
  low: {
    label: "Low",
    textColor: "text-white",
    bgColor: "bg-green-700",
  },
};

export const STATUS_CONFIG = {
  todo: {
    text: "To Do",
    textColor: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: "Circle",
  },
  "in-progress": {
    text: "In Progress",
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: "PlayCircle",
  },
  done: {
    text: "Done",
    textColor: "text-green-600",
    bgColor: "bg-green-100",
    icon: "CheckCircle2",
  },
};
