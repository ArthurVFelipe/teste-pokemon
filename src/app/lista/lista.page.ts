import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  private UrlSvg: String = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  public pokemons: any = [];
  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(){
    this.service.getPokemon().subscribe(
      (data: any) => {
        data.results.forEach((e: any) => {
          let dados: any = {
            'id': e.id,
            'nome': e.name,
            'img': this.UrlSvg + e.url.split('/')[6] + '.svg',
            'favorito': false
          };
          
          this.pokemons.push(dados);
        });
      }
    )
  }

}
