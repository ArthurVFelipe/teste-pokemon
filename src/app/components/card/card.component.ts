import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemon: any;
  @Output() favoritoToggled = new EventEmitter<any>();

  constructor() { }

  toggleFavorito(pokemon:any) {
    this.favoritoToggled.emit(pokemon);
  }
}