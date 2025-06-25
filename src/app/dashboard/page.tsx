
"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PokeballIcon from "@/components/ui/PokeballIcon";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/LogoutButton";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";

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
        {/* Logout button positioned absolutely at the top right */}
        <div className="absolute top-4 right-4 z-50">
          <LogoutButton />
        </div>

        {/* Main content area */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col justify-center min-h-[calc(100vh-64px)] pt-4 pb-8 px-4">
          <div className="flex-shrink-0 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 md:mt-8">
              Welcome back, <span className="text-red-600">{user?.username || 'Trainer'}</span>!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Ready to continue your Pokémon journey? Choose your next adventure below!
            </p>
          </div>

          <div className="flex justify-center flex-shrink-0 mb-6">
            <PokeballIcon size="medium" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0 mb-4">
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

          <div className="flex flex-col md:flex-row justify-center gap-2 flex-shrink-0 mb-4">
            <Button
              onClick={handleViewCaptures}
              className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 py-2 px-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-sm"
            >
              View My Captures
            </Button>
            <Button
              onClick={handleViewSightings}
              className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 py-2 px-4 rounded-lg text-base font-semibold transition-all duration-300 shadow-sm"
            >
              View Sightings
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center flex-shrink-0 py-4">
            <p className="text-base text-gray-600 italic font-medium mb-2">
              Ready to catch them all?
            </p>
            <PokeballIcon size="small" />
          </div>
        </div>
      </BackgroundWrapper>
    </PrivateRoute>
  );
}