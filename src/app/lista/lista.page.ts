import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  private UrlSvg: String = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  public pokemons: any = [];
  private pageNumber: number = 1;
  infiniteScroll: any;
  
  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    let savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      let allPokemons = JSON.parse(savedPokemons);
      const batchSize = 6;
      const start = (this.pageNumber - 1) * batchSize;
      const end = start + batchSize;
      
      let pokemonsBatch = allPokemons.slice(start, end);
      this.pokemons = this.pokemons.concat(pokemonsBatch);
      
      if (this.pokemons.length >= allPokemons.length) {
        this.infiniteScroll.disabled = true;
      }

      return;
    }
  
    this.service.getPokemon().subscribe(
      (data: any) => {
        data.results.forEach((e: any) => {
          let id = e.url.split('/')[6];
          let pokemon: any = {
            'id':  id,
            'nome': e.name,
            'img': this.UrlSvg + id + '.svg',
            'favorito': false
          };
          
          this.pokemons.push(pokemon);
        });
  
        this.saveToLocalStorage();
      }
    );
    
  }
  
  loadMore(event: any) {
    this.pageNumber++;
    this.loadPokemons();
    event.target.complete();
  }

  toggleFavorito(pokemon: any) {
    let pokemonIndex = this.pokemons.findIndex((p: any) => p.id === pokemon.id);
    if (pokemonIndex !== -1) {
      this.pokemons[pokemonIndex].favorito = !this.pokemons[pokemonIndex].favorito;
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  loadFavoritosFromLocalStorage() {
    let savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      this.pokemons = JSON.parse(savedPokemons);
    }
  }
}
