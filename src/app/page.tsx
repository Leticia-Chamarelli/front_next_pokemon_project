"use client";

export default function Home() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Welcome to the Pokémon App!</h1>
      <p className="text-gray-700">
        This is your central hub to catch and manage your Pokémon.
      </p>
      <p className="text-gray-500 text-sm">
        Use the login button above to get started.
      </p>
    </section>
  )
}
