import { Component, OnInit } from '@angular/core';
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

}
