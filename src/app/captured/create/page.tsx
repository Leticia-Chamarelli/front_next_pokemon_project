"use client";

import { CreateCapturedForm } from "@/components/pokemon/captured/CreateCapturedForm";
import { useRouter } from "next/navigation";

export default function CapturedCreatePage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-red-700">Register New Capture</h1>
      <CreateCapturedForm
        onCreated={() => {
          router.push("/captured");
        }}
      />
    </main>
  );
}
