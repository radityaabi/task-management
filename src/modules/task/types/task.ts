import { z } from "zod";

// ============================================================================
// SCHEMAS
// ============================================================================

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
  description: z.string().default(""),
  category: TaskCategorySchema,
  priority: TaskPrioritySchema,
  status: TaskStatusSchema,
  targetDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// TYPES
// ============================================================================

export type Task = z.infer<typeof TaskSchema>;
export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type TaskUpdate = Partial<TaskInput>;

export type TaskCategory = z.infer<typeof TaskCategorySchema>;
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface TaskFormProps {
  task?: Task;
  onSave: (data: TaskInput) => void;
  onCancel: () => void;
}

export interface TaskItemProps {
  task: Task;
  onEdit: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onOpenEdit: (task: Task) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onOpenEdit: (task: Task) => void;
}

// ============================================================================
// HOOK RETURN
// ============================================================================

export interface UseTasksReturn {
  tasks: Task[];
  add: (data: TaskInput) => void;
  edit: (id: number, data: Partial<Task>) => void;
  delete: (id: number) => void;
}
