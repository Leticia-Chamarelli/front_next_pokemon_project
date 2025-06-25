"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import PokeballIcon from "@/components/ui/PokeballIcon";


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
    <BackgroundWrapper>
      {/* Wrapper for background */}

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Pokéball icon above form */}
        <div className="flex justify-center mb-8">
          <PokeballIcon size="medium" />
        </div>

        {/* Form container */}
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Start your Pokémon journey today
          </h1>
          <p className="text-center text-gray-600 text-sm mb-6">
            Log in to track, capture, and explore!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 font-semibold text-gray-700"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                required
                placeholder="your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-semibold text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
              <Link
                href="/register"
                className="text-red-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </main>
    </BackgroundWrapper>
  );
}