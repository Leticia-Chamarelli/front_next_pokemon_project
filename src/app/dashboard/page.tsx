"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PokeballIcon from "@/components/ui/PokeballIcon";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/LogoutButton";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import { List } from "lucide-react";

export default function DashboardPage() {
  const { user, mounted } = useAuth();
  const router = useRouter();

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 text-lg text-gray-700">
        Loading profile...
      </div>
    );
  }

  const handleRegisterCapture = () => {
    router.push("/captured/create");
  };

  const handleReportSighting = () => {
    router.push("/sighted/create");
  };

  const handleViewCaptures = () => {
    router.push("/captured");
  };

  const handleViewSightings = () => {
    router.push("/sighted");
  };

  return (
    <PrivateRoute>
      <BackgroundWrapper>
        <div className="absolute top-4 right-4 z-50">
          <LogoutButton />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col justify-between min-h-screen px-4 py-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 md:mt-8">
              Welcome back,{" "}
              <span className="text-red-600">{user?.username || "Trainer"}</span>!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Ready to continue your Pokémon journey? Choose your next adventure
              below!
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <PokeballIcon size="medium" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DashboardCard
              icon={<span className="text-white text-2xl">➕</span>}
              title="Register Capture"
              description="Log a new Pokémon captured with complete battle details and stats."
              buttonText="Register Capture ✨"
              buttonColorClasses="bg-red-600 hover:bg-red-700"
              onClick={handleRegisterCapture}
            />
            <DashboardCard
              icon={<span className="text-white text-2xl">👁️</span>}
              title="Report Sighting"
              description="Share the location of a rare Pokémon with the global trainer community."
              buttonText="Report Sighting ✨"
              buttonColorClasses="bg-blue-600 hover:bg-blue-700"
              onClick={handleReportSighting}
            />
          </div>

          {/* Quick access links - styled */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            <Button
              variant="outline"
              onClick={handleViewCaptures}
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              <List className="w-4 h-4 mr-2" />
              View My Captures
            </Button>
            <Button
              variant="outline"
              onClick={handleViewSightings}
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
            >
              <List className="w-4 h-4 mr-2" />
              View Sightings
            </Button>
          </div>
        </div>
      </BackgroundWrapper>
    </PrivateRoute>
  );
}
