"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center space-y-6
                 bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50
                 relative overflow-hidden px-4 py-6"
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-500" />
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-500" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-yellow-500" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Capture your <span className="text-red-600">Pokémon</span> journey!
        </h1>

        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          Track every encounter, build your collection, and become the ultimate Pokémon trainer.
          Gotta catch'em all!
        </p>

        {/* Pokéball illustration */}
        <div className="flex justify-center">
          <div className="relative rounded-full overflow-hidden">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center shadow-2xl relative">
              <div className="absolute top-0 overflow-hidden rounded-t-full w-full h-1/2 bg-gradient-to-b from-red-600 to-red-800" />
              <div className="w-full h-3 bg-gray-900 absolute top-1/2 transform -translate-y-1/2 z-10" />
              <div className="absolute bottom-0 overflow-hidden rounded-b-full w-full h-1/2 bg-gradient-to-t from-gray-100 to-gray-300" />
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-4 border-gray-900 flex items-center justify-center absolute z-20 shadow-lg">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-red-200 hover:border-red-400">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">➕</span>
              </div>
              <h3 className="font-bold text-sm mb-1 text-red-700">Register Captures</h3>
              <p className="text-gray-600 text-xs">Log every Pokémon you catch.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-blue-200 hover:border-blue-400">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">👁️</span>
              </div>
              <h3 className="font-bold text-sm mb-1 text-blue-700">Report Sightings</h3>
              <p className="text-gray-600 text-xs">Share rare Pokémon locations.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-yellow-200 hover:border-yellow-400">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">📚</span>
              </div>
              <h3 className="font-bold text-sm mb-1 text-yellow-700">Build Pokédex</h3>
              <p className="text-gray-600 text-xs">Complete your collection.</p>
            </CardContent>
          </Card>
        </div>

        {/* Call-to-action button */}
        <Button
          onClick={() => router.push("/login")}
          size="lg"
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                     text-white font-bold py-2 px-6 rounded-xl text-sm
                     transition-all duration-300 hover:scale-105 shadow-lg
                     w-full md:w-auto border-2 border-red-700"
        >
          ⚡ Start Your Adventure
        </Button>

        {/* Quote section */}
        <div className="text-center max-w-md">
          <p className="text-sm md:text-base text-gray-700 italic leading-relaxed">
            “I want to be the very best, like no one ever was...”
          </p>
          <p className="text-xs text-gray-500 mt-1">— Pokémon Theme Song</p>
        </div>
      </div>
    </section>
  );
}
