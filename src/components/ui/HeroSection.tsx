"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="w-full h-screen bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Adds subtle background decorative shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-500"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-yellow-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-10">
        {/* Main heading and description */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Capture your <span className="text-red-600">Pokémon</span> journey!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Track every encounter, build your collection, and become the ultimate Pokémon trainer. 
          Gotta catch'em all!
        </p>

        {/* Central Pokéball illustration */}
        <div className="flex justify-center mb-10">
          <div className="relative rounded-full overflow-hidden">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center shadow-2xl relative">
              {/* Top red half */}
              <div className="absolute top-0 overflow-hidden rounded-t-full w-full h-1/2 bg-gradient-to-b from-red-600 to-red-800"></div>
              {/* Center black band */}
              <div className="w-full h-3 bg-gray-900 absolute top-1/2 transform -translate-y-1/2 z-10"></div>
              {/* Bottom white/gray half */}
              <div className="absolute bottom-0 overflow-hidden rounded-b-full w-full h-1/2 bg-gradient-to-t from-gray-100 to-gray-300"></div>
              {/* Central button with black core */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-900 flex items-center justify-center absolute z-20 shadow-lg">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements around the section */}
        <div className="absolute -top-8 -right-8 w-16 h-16 opacity-30">
          <div className="text-4xl">⚡</div>
        </div>
        <div className="absolute -bottom-2 -left-8 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-red-200 hover:border-red-400">
            <CardContent className="p-4 text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🎮</span>
              </div>
              <h3 className="font-bold text-md mb-1 text-red-700">Register Captures</h3>
              <p className="text-gray-600 text-sm">Log every Pokémon you catch.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-blue-200 hover:border-blue-400">
            <CardContent className="p-4 text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">👁️</span>
              </div>
              <h3 className="font-bold text-md mb-1 text-blue-700">Report Sightings</h3>
              <p className="text-gray-600 text-sm">Share rare Pokémon locations.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-yellow-200 hover:border-yellow-400">
            <CardContent className="p-4 text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <h3 className="font-bold text-md mb-1 text-yellow-700">Build Pokédex</h3>
              <p className="text-gray-600 text-sm">Complete your collection and track achievements.</p>
            </CardContent>
          </Card>
        </div>

        {/* Call-to-action button */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl text-base transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto border-2 border-red-700"
          >
            ⚡ Start Your Adventure
          </Button>
        </div>

        {/* Inspirational quote, hidden on smaller screens */}
        <div className="mt-6 text-center hidden md:block">
          <p className="text-base text-gray-600 italic font-medium">
            "I want to be the very best, like no one ever was..."
          </p>
          <p className="text-sm text-gray-500 mt-1">- Every Pokémon Trainer</p>
        </div>
      </div>
    </section>
  );
}
