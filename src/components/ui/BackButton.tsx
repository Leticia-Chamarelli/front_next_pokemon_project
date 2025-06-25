"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to: string;
  label?: string;
}

export default function BackButton({ to, label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-1 text-sm text-gray-700 hover:text-black mb-4"
      onClick={() => router.push(to)}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
}
