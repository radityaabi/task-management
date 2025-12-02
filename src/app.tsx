import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard, DetailTask } from "@/routes";
import SynapseLogo from "@/assets/synapse.svg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center px-4">
      <main className="w-full max-w-6xl space-y-4">
        <a href="/">
          <div className="mx-4 my-4 flex items-center space-x-3">
            <img src={SynapseLogo} alt="Synapse" className="h-8 w-auto" />
            <h1 className="text-primary text-4xl font-bold">Synapse</h1>
          </div>
        </a>
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
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Layout>
              <DetailTask />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
