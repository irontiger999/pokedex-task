import axios from "axios";
import { PokemonDetailResponse, PokemonListResponse } from "./interface";

class ApiService {

  getPokemonList(offset: number) {
    return new Promise<PokemonListResponse>((resolve, reject) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=${offset}`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getPokemon(url: string) {
    return new Promise<PokemonDetailResponse>((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export const restAPI = new ApiService()