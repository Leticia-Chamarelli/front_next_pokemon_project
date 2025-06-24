"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

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

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log("Access Token:", accessToken);

    async function fetchSightings() {
      if (!accessToken) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sightings`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Response status:", res.status);
        const text = await res.text();
        console.log("Response text:", text);

        if (!res.ok) {
          throw new Error("Failed to fetch sightings");
        }


        const data: SightedPokemon[] = JSON.parse(text);


        const extendedData: ExtendedSightedPokemon[] = await Promise.all(
          data.map(async (s) => {
            try {
              const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${s.pokemonId}`);
              const pokeData = await pokeRes.json();
              return {
                ...s,
                pokemonName: pokeData.name,
              };
            } catch {
              return {
                ...s,
                pokemonName: "unknown",
              };
            }
          })
        );

        setSightings(extendedData);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchSightings();
  }, [accessToken]);

  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Pokémon Sightings</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && sightings.length === 0 && <p>No sightings found.</p>}

      <ul className="space-y-4">
        {sightings.map((s) => (
          <li key={s.id} className="p-4 bg-white rounded shadow border">
            <p>
              <strong>Pokémon:</strong> {s.pokemonName} (ID: {s.pokemonId})
            </p>
            <p>
              <strong>Region:</strong> {s.region}
            </p>
            <p>
              <strong>Date:</strong> {new Date(s.sightedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
