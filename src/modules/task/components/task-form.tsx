import { useState } from "react";
import { format } from "date-fns";
import type { TaskFormProps, TaskInput } from "@/modules/task/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock } from "lucide-react";

export function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const isEdit = !!task;
  const [dateTime, setDateTime] = useState<Date | undefined>(task?.targetDate);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: TaskInput = {
      title: form.get("title") as string,
      description: (form.get("description") as string) || "",
      category: form.get("category") as TaskInput["category"],
      priority: form.get("priority") as TaskInput["priority"],
      status: form.get("status") as TaskInput["status"],
      targetDate: dateTime,
    };

    onSave(data);
  };

  const setTime = (hours: number, minutes: number) => {
    const date = dateTime || new Date();
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    setDateTime(newDate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input
          name="title"
          required
          defaultValue={task?.title}
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          rows={4}
          defaultValue={task?.description}
          placeholder="Enter task description"
        />
      </div>

      {/* Category, Priority, Status - Responsive Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select name="category" defaultValue={task?.category || "Work"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Study">Study</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Projects">Projects</SelectItem>
              <SelectItem value="Events">Events</SelectItem>
              <SelectItem value="Goals">Goals</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <Select name="priority" defaultValue={task?.priority || "medium"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={task?.status || "todo"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date & Time - Mobile Responsive */}
      <div className="space-y-2">
        <Label>Target Date & Time</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-start text-left"
            >
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">
                {dateTime ? format(dateTime, "PPP 'at' HH:mm") : "Pick a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {/* Mobile: Stack Vertically, Desktop: Side by Side */}
            <div className="flex flex-col sm:flex-row">
              <Calendar
                mode="single"
                selected={dateTime}
                onSelect={setDateTime}
                className="rounded-md"
              />
              <div className="space-y-2 border-t p-3 sm:border-t-0 sm:border-l">
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Time</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Hour</Label>
                    <Select
                      value={dateTime?.getHours().toString() || "12"}
                      onValueChange={(v) =>
                        setTime(parseInt(v), dateTime?.getMinutes() || 0)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Minute</Label>
                    <Select
                      value={dateTime?.getMinutes().toString() || "0"}
                      onValueChange={(v) =>
                        setTime(dateTime?.getHours() || 12, parseInt(v))
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 15, 30, 45].map((m) => (
                          <SelectItem key={m} value={m.toString()}>
                            {m.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="w-full"
                  onClick={() => setDateTime(new Date())}
                >
                  Set to Now
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Actions - Always Full Width Buttons on Mobile */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update" : "Add"} Task</Button>
      </div>
    </form>
  );
}
