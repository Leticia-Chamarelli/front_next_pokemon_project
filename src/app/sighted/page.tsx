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

interface SightedPokemon {
  id: number;
  pokemonId: number;
  region: string;
  sightedAt: string;
}

interface ExtendedSightedPokemon extends SightedPokemon {
  pokemonName: string;
}

export default function SightedPage() {
  const { accessToken } = useAuth();
  const [sightings, setSightings] = useState<ExtendedSightedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSightings() {
    if (!accessToken) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sightings`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch sightings");
      }

      const data: SightedPokemon[] = await res.json();

      const extendedData: ExtendedSightedPokemon[] = await Promise.all(
        data.map(async (s) => {
          try {
            const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${s.pokemonId}`);
            const pokeData = await pokeRes.json();
            return {
              ...s,
              pokemonName: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
            };
          } catch {
            return {
              ...s,
              pokemonName: "Unknown",
            };
          }
        })
      );

      setSightings(extendedData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSightings();
  }, [accessToken]);

  return (
    <BackgroundWrapper>
      <main className="max-w-6xl mx-auto mt-10 px-4 relative z-10">
        <BackButton to="/dashboard" label="Dashboard" />

        <div className="mb-6 flex justify-end">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Link href="/sighted/create">
              <Plus className="w-4 h-4" />
              Register New Sighting
            </Link>
          </Button>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800 flex justify-center items-center gap-2 mx-auto">
              <span>👁️</span> Pokémon Sightings
            </CardTitle>
            <CardDescription className="text-gray-600">
              {sightings.length} Pokémon sighted in your area
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && sightings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👁️</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No sightings found</h3>
                <p className="text-gray-600 mb-6">Start by registering your first sighting!</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/sighted/create">Register First Sighting</Link>
                </Button>
              </div>
            )}

            {sightings.length > 0 && (
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm font-semibold">
                    <th className="p-3 border-b w-1/3">Pokémon</th>
                    <th className="p-3 border-b w-1/3">Region</th>
                    <th className="p-3 border-b w-1/3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sightings.map((sighting) => (
                    <tr key={sighting.id} className="hover:bg-gray-50 transition-colors cursor-default">
                      <td className="p-3 border-b font-medium align-middle truncate max-w-xs">
                        {sighting.pokemonName} (#{sighting.pokemonId})
                      </td>
                      <td className="p-3 border-b align-middle">
                        <div className="flex items-center gap-2 text-gray-600 truncate max-w-xs">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span>{sighting.region}</span>
                        </div>
                      </td>
                      <td className="p-3 border-b align-middle">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span>
                            {new Date(sighting.sightedAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
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
