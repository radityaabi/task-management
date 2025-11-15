import { Button } from "./components/ui/button";
import { TrashIcon, EyeIcon } from "lucide-react";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Tasks = Task[];

const dataTasks = [
  { id: 1, title: "Learn React", isDone: false },
  { id: 2, title: "Build a ToDo App", isDone: true },
  { id: 3, title: "Master TypeScript", isDone: false },
  { id: 4, title: "Explore Redux", isDone: true },
  { id: 5, title: "Understand React Router", isDone: false },
];

export function Tasks() {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {dataTasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskItem({ task }: { task: Task }) {
  function handleDelete() {
    console.log(`Deleting task with id: ${task.id}`);
  }

  return (
    <section className="flex justify-between rounded-lg bg-gray-50 p-4 outline-1 outline-gray-200">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
      <div className="flex gap-2">
        <Button size="xs">
          <EyeIcon />
          <span className="text-xs">View</span>
        </Button>
        <Button variant="destructive" size="xs" onClick={handleDelete}>
          <TrashIcon />
          <span className="text-xs">Delete</span>
        </Button>
      </div>
    </section>
  );
}
