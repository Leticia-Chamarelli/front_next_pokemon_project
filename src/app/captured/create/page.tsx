"use client";

import { CreateCapturedForm } from "@/components/pokemon/captured/CreateCapturedForm";
import BackButton from "@/components/ui/BackButton";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";

export default function CapturedCreatePage() {
  return (
    <BackgroundWrapper>
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-6">
          <BackButton to="/dashboard" label="Back to Dashboard" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700">Register New Capture</h1>
          <p className="text-sm text-gray-600 mt-2">
            Document the moment you caught your favorite Pokémon!
          </p>
        </div>

        <CreateCapturedForm
          onCreated={() => {
            alert(
              "Capture registered successfully! You can add another or go back to the Dashboard."
            );
          }}
        />
      </div>
    </BackgroundWrapper>
  );
}
