import { useState } from "react";
import { useTasks } from "@/modules/task/hooks/use-tasks";
import { TaskForm } from "@/modules/task/components/task-form";
import { TaskList } from "@/modules/task/components/task-list";
import { CategoryProgressCard } from "@/modules/task/components/category-progress-card";
import type { Task, TaskInput } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function TasksPage() {
  const { tasks, add, edit, delete: deleteTask } = useTasks();

  const [dialog, setDialog] = useState<{
    open: boolean;
    task?: Task;
  }>({ open: false });

  const handleSave = (data: TaskInput) => {
    if (dialog.task) {
      edit(dialog.task.id, data);
    } else {
      add(data);
    }
    setDialog({ open: false });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setDialog({ open: true })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Progress Card */}
      <CategoryProgressCard tasks={tasks} />

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onEdit={edit}
        onDelete={deleteTask}
        onOpenEdit={(task) => setDialog({ open: true, task })}
      />

      {/* Dialog Add / Edit */}
      <Dialog open={dialog.open} onOpenChange={(open) => setDialog({ open })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialog.task ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            task={dialog.task}
            onSave={handleSave}
            onCancel={() => setDialog({ open: false })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
