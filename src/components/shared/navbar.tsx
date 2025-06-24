"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { isAuthenticated, user, mounted } = useAuth();

  if (!mounted) return null;

  return (
    <header className="w-full border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          PokémonApp
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <span className="mr-4 text-gray-700">Hi, {user.username}</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
