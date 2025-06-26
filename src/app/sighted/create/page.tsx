"use client";

import { CreateSightedForm } from "@/components/pokemon/sighted/CreateSightedForm";
import BackButton from "@/components/ui/BackButton";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";

export default function SightedCreatePage() {
  return (
    <BackgroundWrapper>
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-6">
          <BackButton to="/dashboard" label="Back to Dashboard" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Report New Sighting</h1>
          <p className="text-sm text-gray-600 mt-2">
            Document when you spotted a wild Pokémon!
          </p>
        </div>

        <CreateSightedForm
          onCreated={() => {
            alert(
              "Sighting registered successfully! You can add another or go back to the Dashboard."
            );
          }}
        />
      </div>
    </BackgroundWrapper>
  );
}
