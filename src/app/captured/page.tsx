"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
              pokemonName: pokeData.name,
            };
          } catch {
            return {
              ...c,
              pokemonName: "unknown",
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
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Pokémon Captures</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && captures.length === 0 && <p>No captures found.</p>}

      <ul className="space-y-4">
        {captures.map((c) => (
          <li key={c.id} className="p-4 bg-white rounded shadow border">
            <p>
              <strong>Pokémon:</strong> {c.pokemonName} (ID: {c.pokemonId})
            </p>
            <p>
              <strong>Region:</strong> {c.region}
            </p>
            <p>
              <strong>Date:</strong> {new Date(c.capturedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
