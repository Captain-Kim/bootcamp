const TOTAL_POKEMON = 151;

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const [response, speciesResponse] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json())
    ]);

    const koreanName = speciesResponse.names.find(
      (name: any) => name.language.name === "ko"
    );

    const koreanDescription = speciesResponse.flavor_text_entries.find(
      (entry: any) => entry.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.types.map(async (type: any) => {
        const typeResponse = await fetch(type.type.url).then(res => res.json());
        const koreanTypeName =
          typeResponse.names.find(
            (name: any) => name.language.name === "ko"
          )?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.abilities.map(async (ability: any) => {
        const abilityResponse = await fetch(ability.ability.url).then(res => res.json());
        const koreanAbilityName =
          abilityResponse.names.find(
            (name: any) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.moves.map(async (move: any) => {
        const moveResponse = await fetch(move.move.url).then(res => res.json());
        const koreanMoveName =
          moveResponse.names.find(
            (name: any) => name.language.name === "ko"
          )?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData = {
      ...response,
      korean_name: koreanName?.name || response.name,
      description: koreanDescription?.flavor_text || "No description available",
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return new Response(JSON.stringify(pokemonData));
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }));
  }
};