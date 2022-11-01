
import axios from 'axios';

let token = 'e79642b4e67692701d0718766a546b84'; 

export const getPokemon = async ( limit: number, offset: number = 0 ) => {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`;
    const response = await axios.get( url );
      return response.data;
}

export const getPokemonDataByIdOrName = async ( name: string | undefined ) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${ name }`;
    const response = await axios.get( url );
      return response.data;
}

export const getWeatherData = async ( id: number ) => {
    let url = `http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${token}`;
    const response = await axios.get( url );
      return response.data;
}


