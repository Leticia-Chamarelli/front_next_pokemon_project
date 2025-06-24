"use client";

import { useEffect, useState } from "react";
import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  id: number;
  username: string;
}

export default function ProfilePage() {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Could not load profile data.");
      }
    };

    if (accessToken) fetchProfile();
  }, [accessToken]);

  return (
    <PrivateRoute>
      <main className="max-w-md mx-auto mt-20 p-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        {error && <p className="text-red-600">{error}</p>}
        {user ? (
          <div className="space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </main>
    </PrivateRoute>
  );
}
