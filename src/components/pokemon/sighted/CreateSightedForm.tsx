"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PokemonOption {
  name: string;
  id: number;
}

const regions = [
  "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"
];

export function CreateSightedForm({ onCreated }: { onCreated?: () => void }) {
  const { accessToken } = useAuth();

  const [pokemonList, setPokemonList] = useState<PokemonOption[]>([]);
  const [pokemonId, setPokemonId] = useState<number | "">("");
  const [region, setRegion] = useState("");
  const [level, setLevel] = useState("");
  const [nickname, setNickname] = useState("");
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
    if (!accessToken || !pokemonId || !region || !level) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sightings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          pokemonId,
          region,
          level: Number(level),
          nickname: nickname.trim() || null,
          sightedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create sighting.");

      setMessage("Sighting created successfully!");
      setPokemonId("");
      setRegion("");
      setLevel("");
      setNickname("");
      onCreated?.();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pokémon */}
          <div>
            <Label htmlFor="pokemon-select">Pokémon</Label>
            <Select
              id="pokemon-select"
              value={pokemonId === "" ? "" : String(pokemonId)}
              onChange={(e) => setPokemonId(Number(e.target.value))}
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Please select a Pokémon.")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              disabled={loading}
              required
            >
              <option value="">Select a Pokémon</option>
              {pokemonList.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)} (#{p.id})
                </option>
              ))}
            </Select>
          </div>

          {/* Region */}
          <div>
            <Label htmlFor="region-select">Region</Label>
            <Select
              id="region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Please select a region.")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              disabled={loading}
              required
            >
              <option value="">Select a region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </div>

          {/* Level */}
          <div>
            <Label htmlFor="level">Level</Label>
            <input
              type="text"
              id="level"
              value={level}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setLevel(val);
                }
              }}
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("Please enter a level.")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter level"
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            />
          </div>

          {/* Nickname */}
          <div>
            <Label htmlFor="nickname">Nickname (optional)</Label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter nickname"
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm"
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Sighting"}
          </Button>

          {message && (
            <p
              className={`mt-2 text-center text-sm ${
                message.includes("successfully") ? "text-green-700" : "text-red-600"
              }`}
              role="alert"
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
