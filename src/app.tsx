import { Tasks } from "./tasks";
import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg">
        <h1 className="my-4 text-3xl font-bold text-purple-800">
          Task Management
        </h1>
        <Button className="my-3 bg-purple-500 hover:bg-purple-700">
          Add Contact
        </Button>
        <Tasks />
      </main>
    </div>
  );
}
