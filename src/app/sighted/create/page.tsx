"use client";

import { useRouter } from "next/navigation";
import { CreateSightedForm } from "@/components/pokemon/sighted/CreateSightedForm";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";

export default function SightedCreatePage() {
  const router = useRouter();

  return (
    <BackgroundWrapper>
      <main className="max-w-4xl mx-auto mt-10 px-4 flex flex-col">
        <BackButton to="/dashboard" label="Dashboard" />

        <h1 className="text-2xl font-bold mb-4 text-blue-700">Report New Sighting</h1>
        
        <CreateSightedForm onCreated={() => router.push("/dashboard")} />
      </main>
    </BackgroundWrapper>
  );
}
