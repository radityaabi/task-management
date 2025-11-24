import { useNavigate } from "react-router";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { Task, TaskItemProps } from "@/modules/task/types/task";
import {
  getStatusDisplay,
  getPriorityDisplay,
  getCategoryDisplay,
  getDateDisplayInfo,
} from "@/modules/task/utils/task-helpers";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import {
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  MoreVertical,
  CheckCircle2,
  Circle,
  PlayCircle,
  TargetIcon,
  PencilIcon,
} from "lucide-react";

export function TaskItem({
  task,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
  onTaskEdit,
  onDelete,
}: TaskItemProps) {
  const navigate = useNavigate();
  const statusDisplay = getStatusDisplay(task.status);
  const priorityDisplay = getPriorityDisplay(task.priority);
  const categoryDisplay = getCategoryDisplay(task.category);
  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  const handleActionClick = () => {
    onToggleActionMenu();
  };

  const handleDeleteClick = () => {
    onDelete();
    onCloseActionMenu();
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    onTaskEdit(task.id, { status: newStatus });
  };

  const handleEditClick = () => {
    onTaskEdit(task.id, {});
    onCloseActionMenu();
  };

  const handleDetailClick = () => {
    navigate(`/detail/${task.id}`);
    onCloseActionMenu();
  };

  const isDoneStyling = `${isDone ? "text-gray-400" : "text-gray-500"}`;

  return (
    <Card
      className={`flex h-full flex-col gap-2 rounded-none py-2 transition-all duration-200 hover:shadow-md ${
        isDone ? "bg-gray-50" : "bg-white"
      }`}
    >
      <CardContent className="flex flex-1 flex-col p-4">
        {/* Header & Title Actions */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-2">
            {/* Status Icon */}
            <div className={`mt-1 rounded-full p-1.5 ${statusDisplay.bgColor}`}>
              <Select
                value={task.status}
                onValueChange={(value: Task["status"]) =>
                  handleStatusChange(value)
                }
              >
                <SelectPrimitive.Trigger className={statusDisplay.textColor}>
                  {statusDisplay.icon == "Circle" ? (
                    <Circle className="h-4 w-4" />
                  ) : statusDisplay.icon == "PlayCircle" ? (
                    <PlayCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </SelectPrimitive.Trigger>
                <SelectContent>
                  <SelectItem value="todo" className="text-xs">
                    <div className="flex items-center gap-2">
                      <Circle className="h-3 w-3" />
                      To Do
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-xs">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-3 w-3" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="done" className="text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Done
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className={`text-base font-semibold text-gray-900`}>
                {task.title}
              </h3>

              {/* Category, Priority */}
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span
                  className={`rounded-sm px-2 py-0.5 text-xs font-bold text-white ${categoryDisplay.bgColor}`}
                >
                  {task.category}
                </span>
                <span
                  className={`rounded-sm border px-2 py-0.5 text-xs font-bold ${priorityDisplay.bgColor} ${priorityDisplay.textColor}`}
                >
                  {priorityDisplay.label}
                </span>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
              onClick={handleActionClick}
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>

            {isActionMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={onCloseActionMenu}
                />
                <div className="absolute top-7 right-0 z-20 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                  <Button variant="ghost" size="xs" onClick={handleDetailClick}>
                    <EyeIcon className="mr-2 h-3.5 w-3.5" />
                    Detail
                  </Button>
                  <Button variant="ghost" size="xs" onClick={handleEditClick}>
                    <PencilIcon className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleDeleteClick}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className={`mb-3 text-sm ${isDoneStyling}`}>{task.description}</p>
        )}

        {/* Metadata */}
        <div className="space-y-1">
          {/* Target Date & Duration*/}
          <div className="flex items-center justify-between">
            {/* Target Date */}
            {dateInfo.targetDate && (
              <div
                className={`flex items-center gap-1 text-xs ${isDoneStyling}`}
              >
                <TargetIcon className="h-3.5 w-3.5" />
                <span>Target {dateInfo.targetDate?.formatted}</span>
              </div>
            )}

            {/* Duration */}
            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs ${
                isDone
                  ? "bg-green-100 text-green-700"
                  : dateInfo.targetDate?.isPastDue
                    ? "bg-red-100 text-red-700"
                    : dateInfo.targetDate?.isToday
                      ? "bg-amber-100 text-amber-700"
                      : dateInfo.targetDate?.isYesterday
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
              }`}
            >
              <ClockIcon className="h-3.5 w-3.5" />
              <span className="font-medium">
                {isDone
                  ? "Completed"
                  : dateInfo.targetDate?.isPastDue
                    ? "Overdue"
                    : dateInfo.targetDate?.relative || "No due date"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Status Selector - Footer */}
      <CardFooter className="flex items-center justify-between border-t bg-gray-50 pt-2 [.border-t]:pt-2">
        <div>
          {dateInfo.createdAt && (
            <p className={`flex items-center gap-1 text-xs ${isDoneStyling}`}>
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Created {dateInfo.createdAt.formatted}</span>
            </p>
          )}
        </div>
        <div className={`text-xs font-normal ${isDoneStyling}`}>
          <p className="mt-1">
            Updated{" "}
            {dateInfo.updatedAt?.longFormatted ||
              dateInfo.createdAt?.longFormatted ||
              "Recently"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
