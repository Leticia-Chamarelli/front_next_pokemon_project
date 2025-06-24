"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, mounted } = useAuth();

  if (!mounted) return <p>Carregando perfil...</p>;

  return (
    <PrivateRoute>
      <main className="max-w-4xl mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>

        {user ? (
          <div className="text-gray-700 space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        ) : (
          <p>Nenhum dado de usuário encontrado.</p>
        )}
      </main>
    </PrivateRoute>
  );
}
