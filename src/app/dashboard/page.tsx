"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useProfile } from "@/hooks/userProfile";

export default function DashboardPage() {
  const { user, loading, error } = useProfile();

  return (
    <PrivateRoute>
      <main className="max-w-4xl mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>

        {loading && <p>Loading profile...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {user ? (
          <div className="text-gray-700 space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        ) : (
          !loading && !error && <p>No user data found.</p>
        )}
      </main>
    </PrivateRoute>
  );
}
