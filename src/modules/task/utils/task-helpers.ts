import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "@/modules/task/types/task";
import {
  CATEGORY_CONFIG,
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  STATUS_WEIGHT,
  PRIORITY_WEIGHT,
} from "@/modules/task/constant/task-constant";
import {
  format,
  differenceInCalendarDays,
  isToday,
  isYesterday,
  isTomorrow,
  isPast,
} from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "MMM dd");
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInDays = differenceInCalendarDays(date, now);
  console.log(`Check beda hari ${diffInDays}`);

  if (isToday(date)) return "Today";
  else if (isTomorrow(date)) return "Tomorrow";
  else if (isYesterday(date)) return "Yesterday";
  else if (diffInDays > 0) return `In ${diffInDays}d`;
  else if (diffInDays < 0) return "Overdue";

  return formatDate(date);
};

export const getDateDisplayInfo = (task: Task) => {
  const targetDate = task.targetDate
    ? {
        formatted: formatDate(task.targetDate),
        relative: getRelativeTime(task.targetDate),
        isToday: isToday(task.targetDate),
        isYesterday: isYesterday(task.targetDate) && task.status !== "done",
        isPastDue: isPast(task.targetDate) && task.status !== "done",
      }
    : null;

  const createdAt = task.createdAt
    ? {
        formatted: formatDate(task.createdAt),
      }
    : null;

  const updatedAt = task.updatedAt
    ? {
        formatted: formatDate(task.updatedAt),
      }
    : null;

  return { createdAt, updatedAt, targetDate };
};

export const getCategoryDisplay = (category: TaskCategory) => {
  return CATEGORY_CONFIG[category];
};

export const getPriorityDisplay = (priority: TaskPriority) => {
  return PRIORITY_CONFIG[priority];
};

export const getStatusDisplay = (status: TaskStatus) => {
  return STATUS_CONFIG[status];
};

export const sortTasks = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    const statusComparison = STATUS_WEIGHT[b.status] - STATUS_WEIGHT[a.status];
    if (statusComparison !== 0) return statusComparison;
    return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
  });
};
