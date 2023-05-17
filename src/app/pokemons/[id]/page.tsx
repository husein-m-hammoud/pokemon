import { types } from "util";
import Image from "next/image";

async function getpokemonById(pokemon_id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data as {
    abilities: Array<any>;
    types: Array<any>;
    base_experience: number;
    forms: Array<any>;
  };
  //return res;
}
interface Props {
  params: { id: string };
}

export default async function PokemonPage({ params }: Props) {
  var pokemon = await getpokemonById(params.id);

  // console.log(pokemon?.abilities)
  return (
    <div className="flex justify-center items-center">
      <div className="w-[40%] justify-center text-center">
        <h1 className="font-bold mb-10 text-7xl text-purple-800 text-center ">
          {" "}
          {pokemon?.forms[0].name}
        </h1>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`}
          alt={""}
          width={100}
          height={100}
          className="m-auto"
        />
        <hr className="my-2" />
        <div className="grid grid-flow-col items-center">
          <div>
            <p className="">Abilities</p>
          </div>
          <div>
            <ul>
              <li>{pokemon?.abilities[0]?.ability.name}</li>
              <li>{pokemon?.abilities[1]?.ability.name}</li>
            </ul>
          </div>
        </div>
        <hr className="my-2" />
        <div className="grid grid-flow-col items-center">
          <p className="">Types</p>
          <ul>
            <li>{pokemon.types[0]?.type.name}</li>
            <li>{pokemon?.types[1]?.type.name}</li>
          </ul>
        </div>
        <hr />
        <div className="mb-1 text-base font-medium text-purple-700 dark:text-purple-500 mt-10">
          Experience
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500"
            style={{ width: pokemon.base_experience }}
          ></div>
        </div>
      </div>
    </div>
  );
}
