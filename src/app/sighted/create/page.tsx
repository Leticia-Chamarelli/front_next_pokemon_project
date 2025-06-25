"use client";

import { useRouter } from "next/navigation";
import { CreateSightedForm } from "@/components/pokemon/sighted/CreateSightedForm";

export default function SightedCreatePage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Report New Sighting</h1>
      <CreateSightedForm onCreated={() => router.push("/sighted")} />
    </main>
  );
}
