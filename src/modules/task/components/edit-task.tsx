import type { Task } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TaskFormFields } from "./task-form-fields";
import { useTaskForm } from "../hooks/use-task-form";

export interface EditTaskProps {
  task: Task;
  onTaskEdited: (taskId: number, updates: Partial<Task>) => void;
  onCancel: () => void;
}

export function EditTask({ task, onTaskEdited, onCancel }: EditTaskProps) {
  const { dateTime, setDateTime, handleTimeChange, resetForm } = useTaskForm({
    initialDateTime: task.targetDate ? new Date(task.targetDate) : undefined,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;

    const updatedTask: Partial<Task> = {
      title,
      description,
      category: category as Task["category"],
      priority: priority as Task["priority"],
      status: status as Task["status"],
      targetDate: dateTime,
    };

    console.log(updatedTask);

    onTaskEdited(task.id, updatedTask);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <Card className="border-0 shadow-none">
        <CardContent className="space-y-4 p-0">
          <TaskFormFields
            dateTime={dateTime}
            onDateTimeChange={setDateTime}
            onTimeChange={handleTimeChange}
            defaultTitle={task.title}
            defaultDescription={task.description || ""}
            defaultCategory={task.category}
            defaultPriority={task.priority}
            defaultStatus={task.status}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update Task</Button>
      </div>
    </form>
  );
}
