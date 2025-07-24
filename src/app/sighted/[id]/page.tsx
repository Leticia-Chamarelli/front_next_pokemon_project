"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";

interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
  level: number;
  nickname?: string;
  region: string;
  date: string;
  types?: string[];
  abilities?: string[];
  height: number;
  weight: number;
  base_experience: number;
}

export default function SightedDetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not authenticated.");
          setLoading(false);
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/sightings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch sighted Pokémon.");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err);
        setError("Failed to load Pokémon data.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <BackgroundWrapper>
        <div className="p-6 text-center text-gray-500">Loading Pokémon data...</div>
      </BackgroundWrapper>
    );
  }

  if (error || !pokemon) {
    return (
      <BackgroundWrapper>
        <div className="p-6 text-center text-red-500">{error || "Pokémon not found."}</div>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <BackButton to="/sighted" />

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              <div>
                <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
                <p className="text-sm text-gray-500">#{pokemon.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p><strong>Level:</strong> {pokemon.level}</p>
                <p><strong>Nickname:</strong> {pokemon.nickname || "No nickname"}</p>
                <p><strong>Region:</strong> {pokemon.region}</p>
                <p><strong>Date:</strong> {new Date(pokemon.date).toLocaleDateString("en-GB")}</p>
              </div>
              <div>
                <p><strong>Types:</strong> {pokemon.types?.join(", ") || "Unknown"}</p>
                <p><strong>Abilities:</strong> {pokemon.abilities?.join(", ") || "Unknown"}</p>
                <p><strong>Height:</strong> {pokemon.height} m</p>
                <p><strong>Weight:</strong> {pokemon.weight} kg</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
              </div>
              <div>
                <img
                  src={`/regions/${pokemon.region}.png`}
                  alt={`Region: ${pokemon.region}`}
                  className="w-full max-w-xs rounded-lg shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BackgroundWrapper>
  );
}
