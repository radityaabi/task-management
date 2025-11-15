import { Button } from "./components/ui/button";

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
  return (
    <section className="flex justify-between rounded-lg bg-emerald-500 p-4">
      <div>
        <h2 className="text-lg font-bold">{task.title}</h2>
        <p>{task.isDone ? "✅ Done" : "📝 Todo"}</p>
      </div>
      <div className="flex gap-2">
        <Button className="mt-2 bg-white text-emerald-600 hover:bg-gray-300">
          View
        </Button>
        <Button className="mt-2 bg-red-500 text-white hover:bg-red-700">
          Delete
        </Button>
      </div>
    </section>
  );
}
