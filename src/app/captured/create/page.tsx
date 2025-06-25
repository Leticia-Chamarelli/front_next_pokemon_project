"use client";

import { CreateCapturedForm } from "@/components/pokemon/captured/CreateCapturedForm";
import BackButton from "@/components/ui/BackButton";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";

export default function CapturedCreatePage() {
  return (
    <BackgroundWrapper>
      <main className="max-w-4xl mx-auto mt-10 px-4">
        <BackButton to="/dashboard" label="Dashboard" />
        <h1 className="text-2xl font-bold mb-4 text-red-700">Register New Capture</h1>
        <CreateCapturedForm
          onCreated={() => {
            alert("Capture registered successfully! You can add another or go back to the Dashboard.");
          }}
        />
      </main>
    </BackgroundWrapper>
  );
}
