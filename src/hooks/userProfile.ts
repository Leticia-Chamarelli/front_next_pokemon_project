import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface User {
  id: number;
  username: string;
}

export function useProfile() {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const json = await res.json();
        setUser(json.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  return { user, loading, error };
}
