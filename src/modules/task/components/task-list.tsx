import type { Task } from "@/modules/task/types/task";
import { TaskItem } from "@/modules/task/components/task-item";

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onOpenEdit: (task: Task) => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onOpenEdit,
}: TaskListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpenEdit={onOpenEdit}
        />
      ))}
    </div>
  );
}
