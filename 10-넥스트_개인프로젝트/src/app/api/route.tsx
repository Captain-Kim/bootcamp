import { NextResponse } from "next/server";

const TOTAL_POKEMON = 151;

export const GET = async (request: Request) => {
  try {
    const allPokemonPromises = Array.from({ length: TOTAL_POKEMON }, (_, index) => {
      const id = index + 1;
      return Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json())
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(([response, speciesResponse], index) => {
      const koreanName = speciesResponse.names.find(
          (name: any) => name.language.name === "ko"
      );
      return { ...response, korean_name: koreanName?.name || null };
    });

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};