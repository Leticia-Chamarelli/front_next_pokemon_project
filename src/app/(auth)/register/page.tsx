"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";
import PokeballIcon from "@/components/ui/PokeballIcon";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(form.username, form.password);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.");
    }
  }

  return (
    <BackgroundWrapper>
      <main className="min-h-screen flex flex-col items-center justify-start px-4 relative overflow-hidden max-w-md mx-auto space-y-6 pt-6 pb-12">
        <div className="w-full">
          <BackButton to="/login" />
        </div>

        {/* Pokéball Icon wrapper to keep aspect ratio */}
        <div className="w-20 md:w-24 aspect-square flex-shrink-0 mx-auto">
          <PokeballIcon size="medium" />
        </div>

        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl w-full p-8 pt-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create your Pokémon Trainer account
          </h1>
          <p className="text-center text-gray-600 text-sm mb-6">
            Join now and start your adventure!
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

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
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg text-base transition-all duration-300 hover:scale-105 shadow-md"
            >
              Register
            </Button>
          </form>

          <p className="text-sm mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-red-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </main>
    </BackgroundWrapper>
  );
}
