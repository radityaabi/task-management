import { useParams, useNavigate } from "react-router";
import { useTasks } from "@/modules/task/hooks/use-task";
import {
  getDateDisplayInfo,
  getPriorityDisplay,
  getCategoryDisplay,
} from "@/modules/task/utils/task-helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  ArrowLeftIcon,
  MoreVertical,
} from "lucide-react";
import { CountdownTimer } from "../components/countdown-timer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditTask } from "../components/edit-task";
import { useEffect } from "react";
import { useTaskActions } from "../hooks/use-task-actions";
import { TaskActionMenu } from "../components/task-action-menu";
import { TaskStatusSelector } from "../components/task-status-selector";
import { TaskHeader } from "../components/task-header";

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTasks();

  const task = tasks.find((t) => t.id === parseInt(taskId || "0"));

  const {
    isActionMenuOpen,
    isEditDialogOpen,
    handleActionClick,
    handleCloseActionMenu,
    handleEditClick,
    handleEditCancel,
    handleTaskEdited,
    handleDeleteClick,
    handleStatusChange,
  } = useTaskActions({
    onTaskEdit: editTask,
    onDelete: (taskId) => {
      deleteTask(taskId);
      navigate("/");
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [taskId]);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Task Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The task you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Back to Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Tasks
          </Button>
        </div>

        <Card className="mb-4 p-4 shadow-sm">
          <CardContent className="p-4">
            {/* Task Header */}
            <div className="mb-4 flex items-start gap-3">
              <div className="shrink-0">
                <TaskStatusSelector
                  task={task}
                  onStatusChange={handleStatusChange}
                  size="lg"
                />
              </div>

              <div className="min-w-0 flex-1">
                <TaskHeader
                  task={task}
                  titleSize="lg"
                  actionMenu={
                    <ActionButton
                      isOpen={isActionMenuOpen}
                      onOpen={handleActionClick}
                      onClose={handleCloseActionMenu}
                      onEdit={handleEditClick}
                      onDelete={() => handleDeleteClick(task.id)}
                      taskId={task.id}
                    />
                  }
                />
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-4">
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Description
                </h3>
                <p
                  className={`rounded-md bg-gray-50 p-3 text-sm text-gray-700 ${isDone ? "text-gray-400" : ""}`}
                >
                  {task.description}
                </p>
              </div>
            )}

            {/* Countdown Timer */}
            {task.targetDate && (
              <div className="mb-4">
                <CountdownTimer targetDate={task.targetDate} isDone={isDone} />
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Dates Section */}
              <Card className="gap-1 border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    Dates & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Target Date */}
                  {dateInfo.targetDate && (
                    <div className="flex items-center gap-2 p-2">
                      <TargetIcon className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Target Date
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.targetDate.longFormatted}
                        </p>
                        {dateInfo.targetDate.relative && (
                          <p className="mt-0.5 text-xs font-medium text-blue-600">
                            {dateInfo.targetDate.relative}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Created Date */}
                  {dateInfo.createdAt && (
                    <div className="flex items-center gap-2 p-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Created
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.createdAt.longFormatted}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  {dateInfo.updatedAt && (
                    <div className="flex items-center gap-2 p-2">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last Updated
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.updatedAt.longFormatted ||
                            dateInfo.createdAt?.longFormatted ||
                            "Recently"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Task Details */}
              <Card className="gap-1 border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Priority */}
                  <div className="flex items-center gap-2 p-2">
                    <div
                      className={`rounded-full p-1.5 ${getPriorityDisplay(task.priority).bgColor}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Priority
                      </p>
                      <p className="text-sm text-gray-600">
                        {getPriorityDisplay(task.priority).label}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-2 p-2">
                    <div
                      className={`rounded-full p-1.5 ${getCategoryDisplay(task.category).bgColor}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Category
                      </p>
                      <p className="text-sm text-gray-600">{task.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditCancel}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <EditTask
            task={task}
            onTaskEdited={handleTaskEdited}
            onCancel={handleEditCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

type ActionButtonProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (taskId: number) => void;
  taskId: number;
};

export function ActionButton({
  isOpen,
  onOpen,
  onClose,
  onEdit,
  onDelete,
  taskId,
}: ActionButtonProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
        onClick={onOpen}
      >
        <MoreVertical className="h-3.5 w-3.5" />
      </Button>

      <TaskActionMenu
        isOpen={isOpen}
        onClose={onClose}
        onEdit={onEdit}
        onDelete={() => onDelete(taskId)}
      />
    </div>
  );
}
