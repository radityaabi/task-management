import { useNavigate } from "react-router";
import type { Task, TaskStatus } from "@/modules/task/types/task";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import {
  MoreVertical,
  Circle,
  PlayCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Edit,
  Target,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCategoryDisplay,
  getPriorityDisplay,
  getDateDisplayInfo,
  getStatusDisplay,
} from "@/modules/task/utils/task-helpers";

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onOpenEdit: (task: Task) => void;
}

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onOpenEdit,
}: TaskItemProps) {
  const navigate = useNavigate();
  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  const statusDisplay = getStatusDisplay(task.status);
  const categoryColor = getCategoryDisplay(task.category).bgColor;
  const priorityDisplay = getPriorityDisplay(task.priority);

  const statusIcon =
    statusDisplay.icon === "Circle" ? (
      <Circle className="h-3 w-3" />
    ) : statusDisplay.icon === "PlayCircle" ? (
      <PlayCircle className="h-3 w-3" />
    ) : (
      <CheckCircle2 className="h-3 w-3" />
    );

  // Handle status change
  const handleStatusChange = (newStatus: TaskStatus) => {
    onEdit(task.id, { status: newStatus });
  };

  return (
    <Card className={`p-4 ${isDone ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Status Selector */}
        <div className="mt-0.5 shrink-0">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm ${statusDisplay.bgColor}`}
          >
            <Select value={task.status} onValueChange={handleStatusChange}>
              <SelectPrimitive.Trigger
                className={`h-full w-full ${statusDisplay.textColor} cursor-pointer rounded-full hover:opacity-80`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full">
                  {statusIcon}
                </div>
              </SelectPrimitive.Trigger>
              <SelectContent>
                <SelectItem value="todo" className="text-sm">
                  <div className="flex items-center gap-2">
                    <Circle className="h-3 w-3" />
                    To Do
                  </div>
                </SelectItem>
                <SelectItem value="in-progress" className="text-sm">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-3 w-3" />
                    In Progress
                  </div>
                </SelectItem>
                <SelectItem value="done" className="text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" />
                    Done
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold ${isDone ? "text-gray-400" : ""}`}>
            {task.title}
          </h3>

          {/* Badges */}
          <div className="mt-2 flex flex-wrap gap-1">
            <span
              className={`rounded px-2 py-0.5 text-xs font-bold text-white ${categoryColor}`}
            >
              {task.category}
            </span>
            <span
              className={`rounded px-2 py-0.5 text-xs font-bold ${priorityDisplay.bgColor} ${priorityDisplay.textColor}`}
            >
              {priorityDisplay.label}
            </span>
          </div>

          {/* Date Information */}
          {task.targetDate && (
            <div className="mt-2 space-y-2">
              {/* Target Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Target className="h-3 w-3" />
                <span>Target {dateInfo.targetDate?.formatted}</span>
              </div>

              {/* Duration/Status Badge */}
              <div
                className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
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
                <Clock className="h-3 w-3" />
                <span>
                  {isDone
                    ? "Completed"
                    : dateInfo.targetDate?.isPastDue
                      ? "Overdue"
                      : dateInfo.targetDate?.relative || "No due date"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/detail/${task.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
