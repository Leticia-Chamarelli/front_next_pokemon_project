// src/app/dashboard/page.tsx
"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PokeballIcon from "@/components/ui/PokeballIcon";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/LogoutButton";

export default function DashboardPage() {
  const { user, mounted, logout } = useAuth();
  const router = useRouter();

  // Displays loading message until authentication state is mounted.
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 text-lg text-gray-700">
        Loading profile...
      </div>
    );
  }

  // Handles navigation to the capture registration form page.
  const handleRegisterCapture = () => {
    router.push("/captured/create");
  };

  // Handles navigation to the sighting report form page.
  const handleReportSighting = () => {
    router.push("/sighted/create");
  };

  // Handles navigation to the list of captured Pokémon.
  const handleViewCaptures = () => {
    router.push("/captured");
  };

  // Handles navigation to the list of reported sightings.
  const handleViewSightings = () => {
    router.push("/sighted");
  };

  // Handles user logout and redirects to the login page.
  // This function is an alternative if LogoutButton needs explicit handling.
  // const handleLogout = () => {
  //   if (logout) {
  //     logout();
  //     router.push("/login");
  //   } else {
  //     router.push("/login"); 
  //   }
  // };

  return (
    <PrivateRoute>
      {/* Main container spanning full width and minimum screen height with gradient background. */}
      <div className="w-full min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-yellow-50 relative overflow-hidden flex flex-col items-center pt-4 pb-8 px-4">
        {/* Decorative background elements with blur to create a soft effect. */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute top-1/2 right-1/2 w-16 h-16 rounded-full bg-yellow-500 blur-3xl"></div>
        </div>

        {/* Logout button positioned absolutely at the top right. */}
        <div className="absolute top-4 right-4 z-50">
          {/* Assumes LogoutButton handles its own logout logic internally. */}
          <LogoutButton /> 
          {/* Alternative: If LogoutButton needs `onClick` prop. */}
          {/* <LogoutButton onClick={handleLogout} /> */}
          {/* Alternative: If LogoutButton does not exist, use a standard Button. */}
          {/* <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 flex items-center gap-1"
          >
            <span className="text-xl">⏏️</span> Logout
          </Button> */}
        </div>

        {/* Main content area, centered and responsive. */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col justify-center min-h-[calc(100vh-64px)]"> {/* Adjusted min-h for better fit */}
          {/* Top section: Welcome message and main tagline. */}
          <div className="flex-shrink-0 mb-4"> {/* flex-shrink-0 prevents it from shrinking too much */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 md:mt-8">
              Welcome back, <span className="text-red-600">{user?.username || 'Trainer'}</span>!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
              Ready to continue your Pokémon journey? Choose your next adventure below!
            </p>
          </div>

          {/* Pokeball icon below the welcome message. */}
          <div className="flex justify-center flex-shrink-0 mb-6">
            <PokeballIcon size="medium" />
          </div>

          {/* Action cards section for main activities. */}
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

          {/* Navigation buttons section for viewing lists. */}
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

          {/* Bottom message and small Pokeball icon. */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 py-4">
            <p className="text-base text-gray-600 italic font-medium mb-2">
              Ready to catch them all?
            </p>
            <PokeballIcon size="small" />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}