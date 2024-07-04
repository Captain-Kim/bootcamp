import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../types/pokemon";

async function fetchPokemonList() {
    try {
        const response = await fetch("/api/pokemons");
        const data: Pokemon[] = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format");
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const useQueryPokemonList = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['pokemonList'],
        queryFn: fetchPokemonList,
        staleTime: Infinity,
    })

    return { data, isPending, isError };
}