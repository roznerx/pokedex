import { useEffect, useState } from "react";
import { getPokeData, getPokemon } from "./api/pokemon";
import PokemonCard from "./components/PokemonCard";
import "./pokemon-list.css";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTotalPokemon() {
      try {
        const res = await getPokemon(0, 0);
        setTotal(res.count);
      } catch (e) {
        console.error("Failed to fetch total count:", e.message);
      }
    };

    fetchTotalPokemon();
  }, []);

  useEffect(() => {
    async function fetchPokemonData() {
      setIsLoading(true);
      try {
        const data = await getPokemon(5, offset);
        const urls = data.results.map(p => p.url);
        setPokemonList(urls);

        const pokeDataPromises = urls.map(url => getPokeData(url));
        const fullData = await Promise.all(pokeDataPromises);

        let parsedData = fullData.filter(Boolean).map(d => ({
          name: d.name,
          number: d.id,
          image: d.sprites.other["official-artwork"].front_default,
          types: d.types,
        }))

        setPokedex(prev => [...prev, ...parsedData]);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

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
      <h3>Showing {pokedex.length} of {total} Pokémon</h3>
      {
        pokedex.length < total && 
        <button
          className="load-btn"
          disabled={isLoading} 
          onClick={() => setOffset(prev => prev + 5)}
        >
          {isLoading ? "Loading..." : "Load More Pokémon"}
        </button>
      }
    </div>
  );
};
