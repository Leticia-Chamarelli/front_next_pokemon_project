"use client";

import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  console.log("API URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <main>
      <HeroSection />
    </main>
  );
}
