"use client";

import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Subtle background decorative circles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-500" />
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-blue-500" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-yellow-500" />
      </div>

      {/* Floating animated bubbles */}
      <div className="absolute -bottom-2 -left-8 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-60" />
      <div
        className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
