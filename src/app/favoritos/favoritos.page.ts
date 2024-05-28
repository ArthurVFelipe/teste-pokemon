import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  public pokemons:any = [];
  constructor(private service: PokemonService) { }

  ionViewWillEnter() {
    this.getPokemons();
  }

  getPokemons(){
    this.pokemons = this.service.getPokemonsFavoritos();
  }

  toggleFavorito(pokemon: any) {
    let pokemonStorage = JSON.parse(localStorage.getItem('pokemons') || '[]');

    this.pokemons = this.updateFavorito(this.pokemons, pokemon);

    let updatedStorage = this.updateFavorito(pokemonStorage, pokemon);
    localStorage.setItem('pokemons', JSON.stringify(updatedStorage));   

    this.getPokemons();
  }

  updateFavorito(list: any[], pokemon: any){
    let index = list.findIndex((p: any) => p.id === pokemon.id);
    if (index !== -1) {
      list[index].favorito = !list[index].favorito;
    }
    return list;
  }

}
