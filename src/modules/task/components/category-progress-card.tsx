import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryDisplay } from "@/modules/task/utils/task-helpers";
import type { Task, TaskCategory } from "@/modules/task/types/task";

interface CategoryProgressCardProps {
  tasks: Task[];
}

interface CategoryStats {
  [key: string]: {
    completed: number;
    total: number;
  };
}

function calculateCategoryStats(tasks: Task[]): CategoryStats {
  const stats: CategoryStats = {};

  tasks.forEach((task) => {
    const category = task.category;

    if (!stats[category]) {
      stats[category] = { completed: 0, total: 0 };
    }

    stats[category].total += 1;

    if (task.status === "done") {
      stats[category].completed += 1;
    }
  });

  return stats;
}

export function CategoryProgressCard({ tasks }: CategoryProgressCardProps) {
  const categoryStats = calculateCategoryStats(tasks);

  if (Object.keys(categoryStats).length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No tasks available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryStats).map(
            ([category, { completed, total }]) => {
              const completionRate = Math.round((completed / total) * 100);
              const categoryDisplay = getCategoryDisplay(
                category as TaskCategory,
              );

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {category}
                    </span>
                    <span className="text-xs text-gray-600">
                      {completed}/{total} ({completionRate}%)
                    </span>
                  </div>

                  <div
                    className={`h-2 w-full rounded-full ${categoryDisplay.progressBgColor}`}
                  >
                    <div
                      className={`${categoryDisplay.progress} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </CardContent>
    </Card>
  );
}
