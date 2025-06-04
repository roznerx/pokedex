import axios from 'axios';

export async function getPokemon(limit, offset) {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: limit,
        offset: offset,
      }
    })

    return res.data;
  } catch (error) {
    console.error('API call failed:', error.message);
  }
}

export async function getPokeData(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('API call failed:', error.message);
    return null;
  }
}
