import { useState } from "react";
import type { Task } from "@/modules/task/types/task";
import type { UseTaskActionsProps } from "@/modules/task/types/task";

export function useTaskActions({
  onTaskEdit,
  onDelete,
}: UseTaskActionsProps = {}) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleActionClick = () => {
    setIsActionMenuOpen(!isActionMenuOpen);
  };

  const handleCloseActionMenu = () => {
    setIsActionMenuOpen(false);
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
    handleCloseActionMenu();
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
  };

  const handleTaskEdited = (taskId: number, updates: Partial<Task>) => {
    onTaskEdit?.(taskId, updates);
    setIsEditDialogOpen(false);
  };

  const handleDeleteClick = (taskId: number) => {
    // TODO: Remove window.confirm
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete?.(taskId);
    }
    handleCloseActionMenu();
  };

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    onTaskEdit?.(taskId, { status: newStatus });
  };

  return {
    isActionMenuOpen,
    isEditDialogOpen,
    handleActionClick,
    handleCloseActionMenu,
    handleEditClick,
    handleEditCancel,
    handleTaskEdited,
    handleDeleteClick,
    handleStatusChange,
    setIsEditDialogOpen,
  };
}
