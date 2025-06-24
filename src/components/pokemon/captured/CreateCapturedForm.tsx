"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface PokemonOption {
  name: string;
  id: number;
}

const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar"];

export function CreateCapturedForm({ onCreated }: { onCreated?: () => void }) {
  const { accessToken } = useAuth();

  const [pokemonList, setPokemonList] = useState<PokemonOption[]>([]);
  const [pokemonId, setPokemonId] = useState<number | "">("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();

        const list = data.results.map((pokemon: { name: string; url: string }) => {
          const id = Number(pokemon.url.split("/").filter(Boolean).pop());
          return { name: pokemon.name, id };
        });

        setPokemonList(list);
      } catch (err) {
        console.error("Error fetching Pokémons", err);
      }
    }

    fetchPokemonList();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accessToken || !pokemonId || !region) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
        console.log("Sending capture with token:", accessToken);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/captured`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          pokemonId,
          region,
          capturedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create capture.");
      }

      setMessage("Capture created successfully!");
      setPokemonId("");
      setRegion("");
      onCreated?.();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-white shadow space-y-4">
      <h2 className="text-xl font-semibold text-green-700">Report a Capture</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Pokémon</label>
        <select
          className="w-full p-2 border rounded"
          value={pokemonId}
          onChange={(e) => setPokemonId(Number(e.target.value))}
          required
        >
          <option value="">Select a Pokémon</option>
          {pokemonList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (#{p.id})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Region</label>
        <select
          className="w-full p-2 border rounded"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        >
          <option value="">Select a region</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Capture"}
      </button>

      {message && <p className="text-sm mt-2 text-green-700">{message}</p>}
    </form>
  );
}
