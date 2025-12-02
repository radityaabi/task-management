import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTasks } from "@/modules/task/hooks/use-tasks";
import {
  getDateDisplayInfo,
  getPriorityDisplay,
  getCategoryDisplay,
  getStatusDisplay,
} from "@/modules/task/utils/task-helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  Target,
  ArrowLeft,
  Edit,
  Trash2,
  Circle,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import { CountdownTimer } from "@/modules/task/components/countdown-timer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/modules/task/components/task-form";
import type { TaskStatus, TaskInput } from "@/modules/task/types/task";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, edit: editTask, delete: deleteTask } = useTasks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const task = tasks.find((task) => task.id === parseInt(id || "0", 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
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
  const statusDisplay = getStatusDisplay(task.status);
  const priorityDisplay = getPriorityDisplay(task.priority);
  const categoryDisplay = getCategoryDisplay(task.category);

  const StatusIcon = {
    todo: Circle,
    "in-progress": PlayCircle,
    done: CheckCircle2,
  }[task.status];

  const handleEdit = (data: TaskInput) => {
    editTask(task.id, data);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
        </div>

        <Card className="mb-4 shadow-sm">
          <CardContent className="p-6">
            {/* Task Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                {/* Status Selector (sama persis seperti di TaskItem) */}
                <div className="mt-1 shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full shadow-md ${statusDisplay.bgColor}`}
                  >
                    <Select
                      value={task.status}
                      onValueChange={(newStatus: TaskStatus) =>
                        editTask(task.id, { ...task, status: newStatus })
                      }
                    >
                      <SelectPrimitive.Trigger
                        className={`h-full w-full ${statusDisplay.textColor} cursor-pointer rounded-full transition hover:opacity-80`}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <StatusIcon className="h-9 w-9" />
                        </div>
                      </SelectPrimitive.Trigger>
                      <SelectContent>
                        <SelectItem value="todo">
                          <div className="flex items-center gap-3">
                            <Circle className="h-4 w-4" />
                            <span>To Do</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="in-progress">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="h-4 w-4" />
                            <span>In Progress</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="done">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Done</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h1
                    className={`text-2xl font-bold ${isDone ? "text-gray-400" : "text-gray-900"}`}
                  >
                    {task.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded px-3 py-1 text-xs font-bold text-white ${categoryDisplay.bgColor}`}
                    >
                      {task.category}
                    </span>
                    <span
                      className={`rounded px-3 py-1 text-xs font-bold ${priorityDisplay.bgColor} ${priorityDisplay.textColor}`}
                    >
                      {priorityDisplay.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hidden gap-1 sm:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-6">
                <h3 className="mb-2 text-base font-semibold text-gray-900">
                  Description
                </h3>
                <p
                  className={`rounded-md bg-gray-50 p-4 text-sm ${isDone ? "text-gray-400" : "text-gray-700"}`}
                >
                  {task.description}
                </p>
              </div>
            )}

            {/* Countdown Timer */}
            {task.targetDate && (
              <div className="mb-6">
                <CountdownTimer targetDate={task.targetDate} isDone={isDone} />
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Dates */}
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    Dates & Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dateInfo.targetDate && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                      <Target className="mt-0.5 h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Target Date
                        </p>
                        <p className="mt-0.5 text-sm text-gray-600">
                          {dateInfo.targetDate.longFormatted}
                        </p>
                        {dateInfo.targetDate.relative && (
                          <p className="mt-1 text-xs font-medium text-blue-600">
                            {dateInfo.targetDate.relative}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {dateInfo.createdAt && (
                    <div className="flex items-start gap-3 p-3">
                      <CalendarIcon className="mt-0.5 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Created
                        </p>
                        <p className="mt-0.5 text-sm text-gray-600">
                          {dateInfo.createdAt.longFormatted}
                        </p>
                      </div>
                    </div>
                  )}

                  {dateInfo.updatedAt && (
                    <div className="flex items-start gap-3 p-3">
                      <ClockIcon className="mt-0.5 h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Last Updated
                        </p>
                        <p className="mt-0.5 text-sm text-gray-600">
                          {dateInfo.updatedAt.longFormatted || "Recently"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Task Info */}
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Task Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${priorityDisplay.bgColor}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Priority
                      </p>
                      <p className="mt-0.5 text-sm text-gray-600">
                        {priorityDisplay.label} Priority
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${categoryDisplay.bgColor}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Category
                      </p>
                      <p className="mt-0.5 text-sm text-gray-600">
                        {task.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            task={task}
            onSave={handleEdit}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
