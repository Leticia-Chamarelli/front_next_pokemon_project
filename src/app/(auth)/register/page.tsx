"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handles input changes and updates form state
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handles form submission and user registration
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
          Create your Pokémon Trainer account
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Join now and start your adventure!
        </p>

        {/* Display error messages */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
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
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
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
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold text-gray-700">
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
  );
}
