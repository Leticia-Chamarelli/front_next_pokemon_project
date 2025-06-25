"use client";

import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  return (
    <>
      <HeroSection />
    </>
  );
}
