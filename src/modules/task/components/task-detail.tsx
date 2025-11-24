import { useParams, useNavigate } from "react-router";
import { useTasks } from "@/modules/task/hooks/use-task";
import {
  getStatusDisplay,
  getPriorityDisplay,
  getCategoryDisplay,
  getDateDisplayInfo,
} from "@/modules/task/utils/task-helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  ArrowLeftIcon,
  CheckCircle2,
  Circle,
  PlayCircle,
} from "lucide-react";
import { CountdownTimer } from "./countdown-timer";

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === parseInt(taskId || "0"));

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

  const statusDisplay = getStatusDisplay(task.status);
  const priorityDisplay = getPriorityDisplay(task.priority);
  const categoryDisplay = getCategoryDisplay(task.category);
  const dateInfo = getDateDisplayInfo(task);
  const isDone = task.status === "done";

  const statusIcon =
    statusDisplay.icon === "Circle" ? (
      <Circle className="h-5 w-5" />
    ) : statusDisplay.icon === "PlayCircle" ? (
      <PlayCircle className="h-5 w-5" />
    ) : (
      <CheckCircle2 className="h-5 w-5" />
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Tasks
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Task Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${statusDisplay.bgColor}`}>
                  <div className={statusDisplay.textColor}>{statusIcon}</div>
                </div>
                <div>
                  <h1
                    className={`text-2xl font-bold ${isDone ? "text-gray-500" : "text-gray-900"}`}
                  >
                    {task.title}
                  </h1>

                  {/* Category & Priority Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-3 py-1.5 text-sm font-bold text-white ${categoryDisplay.bgColor}`}
                    >
                      {task.category}
                    </span>
                    <span
                      className={`rounded-md border px-3 py-1.5 text-sm font-bold ${priorityDisplay.bgColor} ${priorityDisplay.textColor}`}
                    >
                      {priorityDisplay.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className={`text-gray-700 ${isDone ? "text-gray-400" : ""}`}>
                  {task.description}
                </p>
              </div>
            )}

            {task.targetDate && (
              <div className="mb-6">
                <CountdownTimer targetDate={task.targetDate} isDone={isDone} />
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Dates Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Target Date */}
                  {dateInfo.targetDate && (
                    <div className="flex items-center gap-3">
                      <TargetIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Target Date
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateInfo.targetDate.longFormatted}
                        </p>
                        {dateInfo.targetDate.relative && (
                          <p className="text-xs text-gray-500">
                            {dateInfo.targetDate.relative}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Created Date */}
                  {dateInfo.createdAt && (
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
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
                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
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

              {/* Status & Priority Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${statusDisplay.bgColor}`}
                    >
                      <div className={statusDisplay.textColor}>
                        {statusIcon}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Status
                      </p>
                      <p className="text-sm text-gray-600">{task.status}</p>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${priorityDisplay.bgColor}`}
                    >
                      <div className={priorityDisplay.textColor}></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Priority
                      </p>
                      <p className="text-sm text-gray-600">
                        {priorityDisplay.label}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${categoryDisplay.bgColor}`}
                    ></div>
                    <div>
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
    </div>
  );
}
