"use client";

import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../types/pokemon";
import axios from "axios";

async function fetchPokemon(id: string): Promise<Pokemon> {
    try {
        const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch Pokemon");
    }
}

export const useQueryPokemonId = (id: number) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['pokemonId', id],
        queryFn: () => fetchPokemon(id.toString()),
        staleTime: Infinity,
    });

    return { data, isPending, isError };
}