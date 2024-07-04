export type Pokemon = {
    id: number;
    name: string;
    korean_name: string;
    height: number;
    weight: number;
    sprites: { front_default: string };
    types: { type: { name: string; korean_name: string } }[];
    abilities: { ability: { name: string; korean_name: string } }[];
    moves: { move: { name: string; korean_name: string } }[];
    description: string;
}