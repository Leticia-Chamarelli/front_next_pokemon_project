"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreateCapturedForm } from "@/components/pokemon/captured/CreateCapturedForm";

export default function CapturedCreatePage() {
  const { accessToken } = useAuth();

  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Register New Capture</h1>

      <CreateCapturedForm onCreated={() => {
        // Opcional: redirecionar para /captured após criar
        // Exemplo com next/navigation:
        // const router = useRouter();
        // router.push("/captured");
      }} />
    </main>
  );
}
