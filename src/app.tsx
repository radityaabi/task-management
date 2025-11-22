import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tasks } from "@/modules/task/components/tasks";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center px-4">
      <main className="w-full max-w-6xl space-y-4">
        <h1 className="mx-4 my-4 text-3xl font-bold text-emerald-600">
          Synapse
        </h1>
        {children}
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Tasks />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
