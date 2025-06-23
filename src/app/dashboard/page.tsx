import { PrivateRoute } from "@/components/PrivateRoute";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <main className="max-w-4xl mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
        <p className="text-gray-700">Welcome! This page is only visible to authenticated users.</p>
      </main>
    </PrivateRoute>
  );
}
