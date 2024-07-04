'use client';

import Link from "next/link";
import Image from "next/image";
import { useQueryPokemonList } from "../../hooks/useQueryPokemonList";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MainPage() {

  const { data: pokemonList, isPending, isError } = useQueryPokemonList();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const filteredPokemonList = pokemonList?.filter(pokemon =>
    pokemon.korean_name.includes(debouncedSearchText)
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>에러남</div>;

  return (
    <div className="bg-blue-900">
      <nav className=" top-0 w-full max-w-800px bg-purple-600 shadow-lg py-1 px-6 flex justify-center items-center gap-4 z-10">
        <h1 id="button-home" className="text-white font-bold text-2xl cursor-pointer">나만의 포켓몬 도감</h1>
        <input
          type="text"
          id="search-text"
          placeholder="포켓몬 이름을 검색하세요"
          className="p-1 bg-red-900 text-white border border-black rounded-md shadow-inner"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button id="search-button" className="text-white font-bold text-xl">🔍</button>
      </nav>
      <main id="main" className="mt-20 p-4 flex flex-wrap justify-center gap-4">
        <div className="poke-list flex flex-wrap justify-center gap-4">
          {filteredPokemonList && filteredPokemonList.map((pokemon) => (
            <Link href={`/detail/${pokemon.id}`} key={pokemon.id}>
              <div className="card w-48 min-h-48 bg-red-900 text-cyan-200 border border-black rounded-lg shadow-md p-2 cursor-pointer transform transition-all hover:scale-105">
                <h3 className="text-lg font-bold flex justify-between">
                  <span>{pokemon.korean_name}</span>
                  <span>No. {pokemon.id}</span>
                </h3>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={128} height={128} className="mx-auto" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}