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
  "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar",
];

export function CreateCapturedForm({ onCreated }: { onCreated?: () => void }) {
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
      setMessage("Please fill all required fields.");
      return;
    }

    const parsedLevel = parseInt(level, 10);
    if (isNaN(parsedLevel) || parsedLevel < 1) {
      setMessage("Level must be a valid number greater than 0.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/captured`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          pokemonId,
          region,
          level: parsedLevel,
          nickname: nickname.trim() || null,
          capturedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create capture.");

      setMessage("Capture created successfully!");
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
          <div>
            <Label htmlFor="pokemon-select" className="mb-1 block text-sm font-medium">
              Pokémon
            </Label>
            <Select
              id="pokemon-select"
              value={pokemonId === "" ? "" : String(pokemonId)}
              onChange={(e) => setPokemonId(Number(e.target.value))}
              onInvalid={(e) => e.currentTarget.setCustomValidity("Please select a Pokémon.")}
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

          <div>
            <Label htmlFor="region-select" className="mb-1 block text-sm font-medium">
              Region
            </Label>
            <Select
              id="region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onInvalid={(e) => e.currentTarget.setCustomValidity("Please select a region.")}
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

          <div>
            <Label htmlFor="level" className="mb-1 block text-sm font-medium">
              Level
            </Label>
            <input
              type="text"
              id="level"
              value={level}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setLevel(val);
              }}
              onInvalid={(e) => e.currentTarget.setCustomValidity("Please enter a level.")}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              inputMode="numeric"
              pattern="\d*"
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter level"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="nickname" className="mb-1 block text-sm font-medium">
              Nickname (optional)
            </Label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter nickname"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {loading ? "Submitting..." : "Submit Capture"}
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
