import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemon(){
    return this.http.get(`${this.baseUrl}pokemon?offset=0&limit=150`);
  }

  getPokemonsFavoritos(){
    let pokemonsStorage = JSON.parse(localStorage.getItem('pokemons') || '[]');
    return pokemonsStorage.filter((pokemon:any) => pokemon.favorito == true);
  }

  getDetalhes(id:number){
    return this.http.get(`${this.baseUrl}pokemon/${id}`);
  }
}
