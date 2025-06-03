import { useEffect, useState } from "react";
import "./pokemon-list.css";
import { getPokeData, getPokemon } from "./api/pokemon";
import PokemonCard from "./components/PokemonCard";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const data = await getPokemon(offset);
        const urls = data.results.map(p => p.url);
        setPokemonList(urls);

        const pokeDataPromises = urls.map(url => getPokeData(url));
        const fullData = await Promise.all(pokeDataPromises);

        let parsedData = fullData.map(d => ({
          name: d.name,
          number: d.id,
          image: d.sprites.other["official-artwork"].front_default,
          types: d.types,
        }))

        setPokedex(prev => [...prev, ...parsedData]);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error.message);
      }
    }

    fetchPokemonData();
  }, [offset]);

  return (
    <div className="pokedex">
      <div className="header">
        <h1>Pokédex</h1>
      </div>
      <ul className="pokemon-grid">
        {
          pokemonList.length > 0 && pokedex.map((p) => (
            <PokemonCard 
              key={p.number}
              name={p.name}
              number={p.number}
              image={p.image}
              types={p.types}
            />
          ))
        }
      </ul>
      <button
        className="load-btn" 
        onClick={() => setOffset(prev => prev + 5)}
      >
        Load More Pokémon
      </button>
    </div>
  );
};
