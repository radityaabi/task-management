import { z } from "zod";

export const TaskCategorySchema = z.enum([
  "Work",
  "Personal",
  "Study",
  "Health",
  "Finance",
  "Shopping",
  "Projects",
  "Events",
  "Goals",
  "Others",
]);

export const TaskPrioritySchema = z.enum(["low", "medium", "high"]);
export const TaskStatusSchema = z.enum(["todo", "in-progress", "done"]);

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(3, "Title is required"),
  description: z.string(),
  category: TaskCategorySchema,
  priority: TaskPrioritySchema,
  status: TaskStatusSchema,
  targetDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  targetDate: z.date().optional(),
});
export const UpdateTaskSchema = CreateTaskSchema.partial();

export type TaskCategory = z.infer<typeof TaskCategorySchema>;
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

export interface AddTaskProps {
  onTaskAdded: (task: CreateTaskData) => void;
  onCancel: () => void;
}

export interface EditTaskProps {
  task: Task;
  onTaskEdited: (taskId: number, updates: Partial<Task>) => void;
  onCancel: () => void;
}

export interface TaskActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetail?: () => void;
  showViewDetail?: boolean;
}

export interface UseTaskActionsProps {
  onTaskEdit?: (taskId: number, updates: Partial<Task>) => void;
  onDelete?: (taskId: number) => void;
}

export interface TaskFormFieldsProps {
  dateTime?: Date;
  onDateTimeChange: (date: Date | undefined) => void;
  onTimeChange: (hours: number, minutes: number) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultCategory?: string;
  defaultPriority?: string;
  defaultStatus?: string;
}

export interface UseTaskFormProps {
  initialDateTime?: Date;
}

export interface TaskHeaderProps {
  task: Task;
  titleSize?: "sm" | "md" | "lg";
  showActionButton?: boolean;
  onActionClick?: () => void;
  actionMenu?: React.ReactNode;
}

export interface TaskStatusSelectorProps {
  task: Task;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
  size?: "sm" | "md" | "lg";
}

export interface TaskItemProps {
  task: Task;
  isActionMenuOpen: boolean;
  onToggleActionMenu: () => void;
  onCloseActionMenu: () => void;
  onTaskEdit: (taskId: number, updates: Partial<Task>) => void;
  onDelete: () => void;
  onEdit: (taskId: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onTaskEdit: (taskId: number, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: number) => void;
  onEdit: (taskId: number) => void;
}

export interface TasksHook {
  tasks: Task[];
  addTask: (task: CreateTaskData) => void;
  editTask: (taskId: number, updates: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
}
