import type { CreateTaskData } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TaskFormFields } from "./task-form-fields";
import { useTaskForm } from "../hooks/use-task-form";

interface AddTaskProps {
  onTaskAdded: (task: CreateTaskData) => void;
  onCancel: () => void;
}

export function AddTask({ onTaskAdded, onCancel }: AddTaskProps) {
  const { dateTime, setDateTime, handleTimeChange, resetForm } = useTaskForm();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;

    const newTask: CreateTaskData = {
      title,
      description,
      category: category as CreateTaskData["category"],
      priority: priority as CreateTaskData["priority"],
      status: status as CreateTaskData["status"],
      targetDate: dateTime,
    };

    console.log(newTask);

    onTaskAdded(newTask);
    event.currentTarget.reset();
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
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
