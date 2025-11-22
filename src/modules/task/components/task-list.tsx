import type { Task, TaskListProps } from "@/modules/task/types/task";
import { TaskItem } from "@/modules/task/components/task-item";
import { useState } from "react";

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    onTaskUpdate(taskId, { status: newStatus });
  };

  const handleDelete = (taskId: number) => {
    onTaskDelete(taskId);
    setOpenActionMenu(null);
  };

  const toggleActionMenu = (taskId: number) => {
    setOpenActionMenu(openActionMenu === taskId ? null : taskId);
  };

  const closeActionMenu = () => {
    setOpenActionMenu(null);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isActionMenuOpen={openActionMenu === task.id}
          onToggleActionMenu={() => toggleActionMenu(task.id)}
          onCloseActionMenu={closeActionMenu}
          onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
}
