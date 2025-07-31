"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";

interface Pokemon {
  id: number;
  pokemonName: string;
  nickname?: string;
  level?: number;
  regionName: string;
  regionImageUrl?: string;
  pokemonImageUrl?: string;
  createdAt: string;
}

export default function SightedDetailPage() {
  const { id } = useParams() as { id: string };
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/sighted/${id}`;
        console.log("👉 Fetching:", url);

        const res = await fetch(url, {
          credentials: "include",
        });

        console.log("✅ Response status:", res.status);
        const text = await res.text();
        console.log("📦 Raw response body:", text);

        if (!res.ok) {
          throw new Error("❌ Failed to fetch sighted Pokémon details.");
        }

        const data = JSON.parse(text);
        console.log("🎉 Parsed JSON:", data);

        setPokemon(data);
      } catch (err) {
        setError("An error occurred while loading the Pokémon details.");
        console.error("🧨 Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return (
    <BackgroundWrapper>
      <div className="max-w-md mx-auto">
        <BackButton to="" />
        <h1 className="text-xl font-bold mb-4 text-center">Sighted Pokémon Details</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {pokemon && (
          <Card>
            <CardContent className="grid gap-4 p-4">
              {pokemon.pokemonImageUrl && (
                <img
                  src={pokemon.pokemonImageUrl}
                  alt={pokemon.pokemonName}
                  className="w-32 h-32 object-contain mx-auto"
                />
              )}

              <div>
                <strong>Name:</strong> {pokemon.pokemonName}
              </div>
              {pokemon.nickname && (
                <div>
                  <strong>Nickname:</strong> {pokemon.nickname}
                </div>
              )}
              {pokemon.level !== undefined && (
                <div>
                  <strong>Level:</strong> {pokemon.level}
                </div>
              )}
              <div>
                <strong>Region:</strong> {pokemon.regionName}
              </div>
              <div>
                <strong>Sighted at:</strong>{" "}
                {new Date(pokemon.createdAt).toLocaleString()}
              </div>

              {pokemon.regionImageUrl && (
                <img
                  src={pokemon.regionImageUrl}
                  alt={pokemon.regionName}
                  className="w-full max-h-64 object-cover rounded-md"
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </BackgroundWrapper>
  );
}
