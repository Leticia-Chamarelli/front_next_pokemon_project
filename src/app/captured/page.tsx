"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Calendar, MapPin } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CapturedPokemon {
  id: number;
  pokemonId: number;
  region: string;
  capturedAt: string;
}

interface ExtendedCapturedPokemon extends CapturedPokemon {
  pokemonName: string;
}

export default function CapturedPage() {
  const { accessToken } = useAuth();
  const [captures, setCaptures] = useState<ExtendedCapturedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCaptures() {
    if (!accessToken) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/captured`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch captures");
      }

      const data: CapturedPokemon[] = await res.json();

      const extendedData: ExtendedCapturedPokemon[] = await Promise.all(
        data.map(async (c) => {
          try {
            const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${c.pokemonId}`);
            const pokeData = await pokeRes.json();
            return {
              ...c,
              pokemonName: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
            };
          } catch {
            return {
              ...c,
              pokemonName: "Unknown",
            };
          }
        })
      );

      setCaptures(extendedData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCaptures();
  }, [accessToken]);

  return (
    <BackgroundWrapper>
      <main className="max-w-6xl mx-auto mt-10 px-4 relative z-10">
        <BackButton to="/dashboard" label="Dashboard" />

        <div className="mb-6 flex justify-end">
          <Button
            asChild
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Link href="/captured/create">
              <Plus className="w-4 h-4" />
              Register New Capture
            </Link>
          </Button>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800 flex justify-center items-center gap-2 mx-auto">
              <span>🕹️</span> Pokémon Captured
            </CardTitle>
            <CardDescription className="text-gray-600">
              {captures.length} Pokémon in your collection
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && captures.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🕹️</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No captures found</h3>
                <p className="text-gray-600 mb-6">Start by registering your first capture!</p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/captured/create">Register First Capture</Link>
                </Button>
              </div>
            )}

            {captures.length > 0 && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold">
                    <th className="p-3 border-b">Pokémon</th>
                    <th className="p-3 border-b">Region</th>
                    <th className="p-3 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {captures.map((capture) => (
                    <tr key={capture.id} className="hover:bg-gray-50 transition-colors cursor-default">
                      <td className="p-3 border-b font-medium align-middle">
                        {capture.pokemonName} (#{capture.pokemonId})
                      </td>
                      <td className="p-3 border-b align-middle">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {capture.region}
                        </div>
                      </td>
                      <td className="p-3 border-b align-middle">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {new Date(capture.capturedAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </BackgroundWrapper>
  );
}
