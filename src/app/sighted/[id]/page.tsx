import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";

interface PokemonDetailProps {
  params: {
    id: string;
  };
}

async function getSightedPokemonById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sighted/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sighted Pokémon");
  }

  return res.json();
}

export default async function SightedDetailPage({ params }: PokemonDetailProps) {
  const pokemon = await getSightedPokemonById(params.id);

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
                <p><strong>Nickname:</strong> {pokemon.nickname || "Nenhum"}</p>
                <p><strong>Região:</strong> {pokemon.region}</p>
                <p><strong>Data:</strong> {new Date(pokemon.date).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p><strong>Tipos:</strong> {pokemon.types?.join(", ")}</p>
                <p><strong>Habilidades:</strong> {pokemon.abilities?.join(", ")}</p>
                <p><strong>Altura:</strong> {pokemon.height} m</p>
                <p><strong>Peso:</strong> {pokemon.weight} kg</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p><strong>Experiência Base:</strong> {pokemon.base_experience}</p>
              </div>
              <div>
                <img
                  src={`/regions/${pokemon.region}.png`}
                  alt={`Região de ${pokemon.region}`}
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
