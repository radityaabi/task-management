import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskFormFieldsProps {
  dateTime?: Date;
  onDateTimeChange: (date: Date | undefined) => void;
  onTimeChange: (hours: number, minutes: number) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultCategory?: string;
  defaultPriority?: string;
  defaultStatus?: string;
}

export function TaskFormFields({
  dateTime,
  onDateTimeChange,
  onTimeChange,
  defaultTitle = "",
  defaultDescription = "",
  defaultCategory = "Work",
  defaultPriority = "medium",
  defaultStatus = "todo",
}: TaskFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter task title"
          defaultValue={defaultTitle}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          rows={4}
          defaultValue={defaultDescription}
        />
      </div>

      {/* Category, Priority, Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={defaultCategory}>
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
          <Label htmlFor="priority">Priority</Label>
          <Select name="priority" defaultValue={defaultPriority}>
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
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={defaultStatus}>
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

      {/* Target Date & Time */}
      <div className="space-y-2">
        <Label>Target Date & Time</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className={cn(
                "w-full justify-start text-left",
                !dateTime && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTime ? (
                format(dateTime, "PPP 'at' HH:mm")
              ) : (
                <span>Pick a date and time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col sm:flex-row">
              {/* Calendar Section */}
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={dateTime}
                  onSelect={onDateTimeChange}
                  className="rounded-md border"
                />
              </div>

              {/* Time Picker Section */}
              <div className="flex flex-col border-t p-3 sm:border-t-0 sm:border-l">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Time</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Hours */}
                  <div className="space-y-1">
                    <Label htmlFor="hours" className="text-xs">
                      Hours
                    </Label>
                    <Select
                      value={dateTime ? dateTime.getHours().toString() : "12"}
                      onValueChange={(value) =>
                        onTimeChange(
                          parseInt(value),
                          dateTime?.getMinutes() || 0,
                        )
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={i.toString()}
                            className="text-xs"
                          >
                            {i.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minutes */}
                  <div className="space-y-1">
                    <Label htmlFor="minutes" className="text-xs">
                      Minutes
                    </Label>
                    <Select
                      value={dateTime ? dateTime.getMinutes().toString() : "0"}
                      onValueChange={(value) =>
                        onTimeChange(
                          dateTime?.getHours() || 12,
                          parseInt(value),
                        )
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {[0, 15, 30, 45].map((minute) => (
                          <SelectItem
                            key={minute}
                            value={minute.toString()}
                            className="text-xs"
                          >
                            {minute.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Time Buttons */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const now = new Date();
                      onDateTimeChange(now);
                    }}
                  >
                    Now
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Selected DateTime Display */}
        {dateTime && (
          <p className="mt-2 text-xs text-green-600">
            Selected: {format(dateTime, "EEEE, MMMM d, yyyy 'at' HH:mm")}
          </p>
        )}
      </div>
    </div>
  );
}
