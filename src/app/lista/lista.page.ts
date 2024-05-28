import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  private UrlSvg: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  public pokemons: any[] = [];
  public paginatedPokemons: any[] = [];
  public pageNumber: number = 1;
  public pageSize: number = 6;

  constructor(private service: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    const savedPokemons = localStorage.getItem('pokemons');

    if (!savedPokemons || savedPokemons === '[]') {
      this.service.getPokemon().subscribe((data: any) => {
        const pokemonsArray: any[] = [];
        const detailsRequests: Observable<any>[] = data.results.map((e: any) => {
          const id = e.url.split('/')[6];
          return this.getDetalhes(id).pipe(
            map((detalhes: any) => ({
              id,
              nome: e.name,
              img: `${this.UrlSvg}${id}.svg`,
              favorito: false,
              detalhes
            }))
          );
        });

        forkJoin(detailsRequests).subscribe((detailsResults: any[]) => {
          pokemonsArray.push(...detailsResults);
          localStorage.setItem('pokemons', JSON.stringify(pokemonsArray));
          this.pokemons = pokemonsArray;
        });
      });
    } else {
      this.pokemons = JSON.parse(savedPokemons);
    }

    this.loadPaginatedPokemons();
  }

  getDetalhes(id: number) {
    return this.service.getDetalhes(id).pipe(
      map((data: any) => ({
        altura: data.height,
        peso: data.weight,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defesa: data.stats[2].base_stat,
        velocidade: data.stats[5].base_stat
      }))
    );
  }

  loadPaginatedPokemons() {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPokemons = this.pokemons.slice(start, end);
  }

  pageChanged(event: number) {
    this.pageNumber = event;
    this.loadPaginatedPokemons();
  }

  toggleFavorito(pokemon: any) {
    const pokemonStorage = JSON.parse(localStorage.getItem('pokemons') || '[]');

    this.pokemons = this.updateFavorito(this.pokemons, pokemon);

    const updatedStorage = this.updateFavorito(pokemonStorage, pokemon);
    localStorage.setItem('pokemons', JSON.stringify(updatedStorage));
    this.loadPaginatedPokemons();
  }

  updateFavorito(list: any[], pokemon: any) {
    const index = list.findIndex((p: any) => p.id === pokemon.id);
    if (index !== -1) {
      list[index].favorito = !list[index].favorito;
    }
    return list;
  }
}
