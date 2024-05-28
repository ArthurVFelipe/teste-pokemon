import { Component, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { map } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage {
  private UrlSvg: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  public pokemons: any = [];
  private pageNumber: number = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll | undefined;

  constructor(private service: PokemonService) { }

  ionViewWillEnter() {
    this.getPokemons();
  }

  getPokemons() {
    let savedPokemons = localStorage.getItem('pokemons');

      if (!savedPokemons || savedPokemons === '[]') {
        let pokemonsArray: any = [];
        
        this.service.getPokemon().subscribe(
          (data: any) => {
            data.results.forEach((e: any) => {
              let id = e.url.split('/')[6];
              this.getDetalhes(id).subscribe((detalhes: any) => {
                let pokemon: any = {
                  'id': id,
                  'nome': e.name,
                  'img': this.UrlSvg + id + '.svg',
                  'favorito': false,
                  'detalhes': detalhes
                };
                
                pokemonsArray.push(pokemon);
                if (pokemonsArray.length === data.results.length) {
                  localStorage.setItem('pokemons', JSON.stringify(pokemonsArray));
                  this.pokemons = pokemonsArray;
                  this.loadPokemons(true);
                }

              });
            });
          }
        );
      } else {
        this.pokemons = JSON.parse(savedPokemons);
        this.loadPokemons();
      }
  }
  
  getDetalhes(id: number){
    return this.service.getDetalhes(id).pipe(
      map((data: any) => {
        return {
          "altura": data.height,
          "peso": data.weight,
          "hp": data.stats[0].base_stat,
          "ataque": data.stats[1].base_stat,
          "defesa": data.stats[2].base_stat,
          "velocidade": data.stats[5].base_stat
        };
      })
    );
  }

  loadPokemons(reset: boolean = false) {
    let savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      let allPokemons = JSON.parse(savedPokemons);
      let size = 6;
      let start = (this.pageNumber - 1) * size;
      let end = start + size;
  
      let pokemonArray = allPokemons.slice(start, end);
      if (reset) {
        this.pokemons = pokemonArray;
      } else {
        this.pokemons = this.pokemons.concat(pokemonArray);
      }
  
      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = this.pokemons.length >= allPokemons.length;
      }
    }
  }

  loadMore(event: any) {
    this.pageNumber++;
    this.loadPokemons();
    event.target.complete();
  }

  toggleFavorito(pokemon: any) {
    let pokemonStorage = JSON.parse(localStorage.getItem('pokemons') || '[]');

    this.pokemons = this.updateFavorito(this.pokemons, pokemon);

    let updatedStorage = this.updateFavorito(pokemonStorage, pokemon);
    localStorage.setItem('pokemons', JSON.stringify(updatedStorage));   
  }

  updateFavorito(list: any[], pokemon: any){
    let index = list.findIndex((p: any) => p.id === pokemon.id);
    if (index !== -1) {
      list[index].favorito = !list[index].favorito;
    }
    return list;
  }
}
