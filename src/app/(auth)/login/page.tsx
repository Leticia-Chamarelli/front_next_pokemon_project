"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      await loginUser(username, password);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 px-4 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-500"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-yellow-500"></div>
      </div>

      {/* Small Pokéball above the form */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <div className="relative rounded-full overflow-hidden w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center shadow-2xl">
          {/* Top red half */}
          <div className="absolute top-0 overflow-hidden rounded-t-full w-full h-1/2 bg-gradient-to-b from-red-600 to-red-800"></div>
          {/* Center black band */}
          <div className="w-full h-3 bg-gray-900 absolute top-1/2 transform -translate-y-1/2 z-10"></div>
          {/* Bottom white/gray half */}
          <div className="absolute bottom-0 overflow-hidden rounded-b-full w-full h-1/2 bg-gradient-to-t from-gray-100 to-gray-300"></div>
          {/* Central button with black core */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-gray-900 flex items-center justify-center absolute z-20 shadow-lg">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Form container */}
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl w-full max-w-md p-8 pt-28">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Start your Pokémon journey today
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Log in to track, capture, and explore!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              placeholder="your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          {/* Error feedback */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg text-base transition-all duration-300 hover:scale-105 shadow-md"
          >
            Login
          </Button>

          {/* Link to registration */}
          <p className="text-sm mt-4 text-center text-gray-700">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
