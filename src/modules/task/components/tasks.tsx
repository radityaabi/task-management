import { useTasks } from "@/modules/task/hooks/use-task";
import { sortTasks } from "@/modules/task/utils/task-helpers";
import { TaskList } from "@/modules/task/components/task-list";
import { AddTask } from "@/modules/task/components/add-task";
import { CATEGORY_CONFIG } from "@/modules/task/constant/task-constant";
import type { CreateTaskData } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Tasks() {
  const { tasks, updateTask, deleteTask, addTask } = useTasks();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const categoryStats: Record<string, { completed: number; total: number }> =
    {};

  for (const { category = "Others", status } of tasks) {
    const categoryData = categoryStats[category] || { completed: 0, total: 0 };

    categoryStats[category] = {
      ...categoryData,
      completed: categoryData.completed + (status === "done" ? 1 : 0),
      total: categoryData.total + 1,
    };
  }

  const completedCount = tasks.filter((task) => task.status === "done").length;

  const getCategoryColors = (category: string) => {
    const config =
      CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] ||
      CATEGORY_CONFIG.Others;

    return {
      bg: config.progressBgColor,
      progress: config.progress,
    };
  };

  const handleAddTask = (taskData: CreateTaskData) => {
    addTask(taskData);
    setIsAddTaskOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Tasks
            </h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} •{" "}
              {completedCount} completed
            </p>
          </div>

          {/* Add Task Dialog Trigger */}
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 sm:mr-1" />
                <span>Add Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <AddTask
                onTaskAdded={handleAddTask}
                onCancel={() => setIsAddTaskOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Dashboard */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(categoryStats).map(
                ([category, { completed, total }]) => {
                  const completionRate = Math.round((completed / total) * 100);
                  const { bg, progress } = getCategoryColors(category);

                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {category}
                        </span>
                        <span className="text-sm text-gray-600">
                          {completed}/{total}
                        </span>
                      </div>

                      <div className={`h-2 w-full rounded-full ${bg}`}>
                        <div
                          className={`${progress} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>

        <TaskList
          tasks={sortTasks(tasks)}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
        />
      </div>
    </div>
  );
}
