// src/app/sighted/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface SightedPokemon {
  id: number;
  pokemonId: number;
  region: string;
  sightedAt: string;
}

export default function SightedPage() {
  const { accessToken } = useAuth();
  const [sightings, setSightings] = useState<SightedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSightings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sightings`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch sightings");
        }

        const data = await res.json();
        setSightings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchSightings();
    }
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
            <p><strong>Pokémon ID:</strong> {s.pokemonId}</p>
            <p><strong>Region:</strong> {s.region}</p>
            <p><strong>Date:</strong> {new Date(s.sightedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
