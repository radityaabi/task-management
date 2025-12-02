import { useState, useEffect, useCallback } from "react";
import type {
  Task,
  TaskInput,
  UseTasksReturn,
} from "@/modules/task/types/task";
import { TaskSchema } from "@/modules/task/types/task";

const STORAGE_KEY = "tasks";

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      return parsed
        .map((task: Task) => {
          try {
            return TaskSchema.parse({
              ...task,
              targetDate: task.targetDate
                ? new Date(task.targetDate)
                : undefined,
              createdAt: new Date(task.createdAt),
              updatedAt: new Date(task.updatedAt),
            });
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = useCallback((data: TaskInput) => {
    setTasks((currentTasks) => {
      const lastId = currentTasks[currentTasks.length - 1]?.id || 0;
      const newTask: Task = {
        ...data,
        id: lastId + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...currentTasks, newTask];
    });
  }, []);

  // Edit existing task
  const editTask = useCallback((id: number, data: Partial<Task>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...data, updatedAt: new Date() } : task,
      ),
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((id: number) => {
    setTasks((currentTasks) => {
      const task = currentTasks.find((t) => t.id === id);
      if (!task) return currentTasks;

      if (window.confirm(`Delete "${task.title}"?`)) {
        return currentTasks.filter((t) => t.id !== id);
      }
      return currentTasks;
    });
  }, []);

  return {
    tasks,
    add: addTask,
    edit: editTask,
    delete: deleteTask,
  };
};
