"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-green-50">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Track your <span className="text-blue-600">Pokémon</span> journey!
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
        Capture, track, and share your Pokémon encounters with fellow trainers.<br />
        Build your collection and become the very best!
      </p>

      <div className="flex justify-center items-center mb-12">
        <Sparkles size={60} className="text-pink-500 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <Card className="p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Register Captures</h3>
          <p className="text-sm text-gray-600">Log every Pokémon you catch with details and photos.</p>
        </Card>

        <Card className="p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Report Sightings</h3>
          <p className="text-sm text-gray-600">Share rare Pokémon locations with the community.</p>
        </Card>

        <Card className="p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-sm text-gray-600">Monitor your collection and achievements.</p>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={() => router.push("/login")}>Start Your Journey</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
}