import { useState, useEffect } from "react";
import type {
  Task,
  TasksHook,
  CreateTaskData,
} from "@/modules/task/types/task";
import {
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
} from "@/modules/task/types/task";
import { initialDataTasks } from "@/modules/task/data/initial-data-task";

const STORAGE_KEY = "dataTasks";

export const useTasks = (
  initialTasks: Task[] = initialDataTasks,
): TasksHook => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return initialTasks;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validatedTasks = parsed
          .map((task: Task) => {
            try {
              return TaskSchema.parse({
                ...task,
                targetDate: task.targetDate
                  ? new Date(task.targetDate)
                  : undefined,
                createdAt: task.createdAt
                  ? new Date(task.createdAt)
                  : new Date(),
                updatedAt: task.updatedAt
                  ? new Date(task.updatedAt)
                  : new Date(),
              });
            } catch (error) {
              console.warn("Invalid task data found, skipping:", error);
              return null;
            }
          })
          .filter(Boolean);

        return validatedTasks.length > 0 ? validatedTasks : initialTasks;
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        return initialTasks;
      }
    }

    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: CreateTaskData) => {
    try {
      const validatedData = CreateTaskSchema.parse(taskData);

      const lastId =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
      const newTask: Task = {
        ...validatedData,
        id: lastId + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    } catch (error) {
      console.error("Validation error in addTask:", error);
      throw new Error("Invalid task data");
    }
  };

  const editTask = (taskId: number, updates: Partial<Task>) => {
    try {
      if (Object.keys(updates).length > 0) {
        const validatedUpdates = UpdateTaskSchema.parse(updates);

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId
              ? { ...task, ...validatedUpdates, updatedAt: new Date() }
              : task,
          ),
        );
      }
    } catch (error) {
      console.error("Validation error in updateTask:", error);
      throw new Error("Invalid update data");
    }
  };

  const deleteTask = (taskId: number) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (!taskToDelete) {
      console.warn(`Task with id ${taskId} not found`);
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete task "${taskToDelete.title}"?\n\nThis action cannot be undone.`,
    );

    if (confirmed) {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
    }
  };

  const getTask = (taskId: number) => {
    return tasks.find((task) => task.id === taskId);
  };

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    getTask,
  };
};
