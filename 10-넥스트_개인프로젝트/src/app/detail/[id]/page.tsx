import Image from 'next/image';
import Link from 'next/link';
import type { Pokemon } from '@/types/pokemon';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

async function fetchPokemon(id: string): Promise<Pokemon> {
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: Pokemon = await response.json();
  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const pokemon = await fetchPokemon(params.id);
  return {
      title: `${pokemon.korean_name} - 포켓몬 도감`,
      description: `${pokemon.korean_name}의 상세 정보입니다.`,
  };
}

const PokemonPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id.toString()),
  });

  const pokemon: Pokemon | undefined = await queryClient.getQueryData(['pokemon', id]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>

        <div className="card-big max-w-2xl mx-auto bg-blue-900 text-cyan-200 border border-black rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">{pokemon?.korean_name ?? '이름 없음'}</h2>
          <Image src={pokemon?.sprites.front_default ?? '/default-image.png'} alt={pokemon?.name ?? '포켓몬'} width={300} height={300} className="mx-auto" />
          <p className="text-center mb-4">{pokemon?.description ?? '설명 없음'}</p>
          <div className="card-stats space-y-2">
            <div className="info flex justify-between bg-black bg-opacity-75 p-2 rounded-md">
              <h3 className="height">키: {pokemon?.height ? pokemon.height / 10 : '정보 없음'}m</h3>
              <h3 className="weight">몸무게: {pokemon?.weight ? pokemon.weight / 10 : '정보 없음'}kg</h3>
            </div>
            <div className="types bg-black p-2 rounded-md flex justify-around">
              {pokemon?.types.map((type) => (
                <h3 key={type.type.name}>{type.type.korean_name}</h3>
              ))}
            </div>
            <div className="bg-black bg-opacity-75 p-2 rounded-md ">
              <div className="flex flex-wrap gap-2">
                {pokemon?.moves.map((move) => {
                  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <span key={move.move.name} className={`inline-block ${randomColor} text-white px-3 py-1 rounded-full`}>
                      {move.move.korean_name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="/">뒤로 가기</Link>
          </div>
        </div>

      </HydrationBoundary>
    </div>
  );
};

export default PokemonPage;