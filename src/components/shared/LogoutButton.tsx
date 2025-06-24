"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLogout() {
    logout();
    router.push("/(auth)/login");
  }

  if (!mounted) return null;

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
