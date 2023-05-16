import Image from "next/image";
import Link from "next/link";

async function getpokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon", {
    cache: "force-cache",
  });
  const data = await res.json();
  return data?.results as any[];
}

export default async function Home() {
  const allpokemon = await getpokemon();
 
  return (
    <div>
      <h1 className="font-bold mb-10 text-7xl text-purple-800 text-center "> pokemon</h1>
      <div className="grid grid-cols-5 gap-4">
        {allpokemon && allpokemon.map((pokemon, index) => (
      
        <div className="bg-white rounded-lg shadow-lg" key={pokemon?.name}>
          <Image
            src={
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`
            }
            alt={""}
            width={100}
            height={100}
            className="m-auto"
          />
          <div className="p-6">
            <h2 className="font-bold mb-2 text-2xl text-purple-800">
            {pokemon?.name}
            </h2>
            
            <Link
              href={`/pokemons/${index+1}`}
              className="text-purple-600 hover:text-purple-500 underline text-sm"
            >
              Read More 👉
            </Link>
          </div>
        </div>
))}
      </div>
    </div>
  );
}
