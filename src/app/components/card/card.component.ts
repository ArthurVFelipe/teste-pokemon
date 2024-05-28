import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalhesModalComponent } from '../detalhes-modal/detalhes-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemon: any;
  @Output() favoritoToggled = new EventEmitter<any>();

  ismodalOpen = false;

  constructor(
    private modalCrtl: ModalController
  ) { }

  toggleFavorito(pokemon:any) {
    this.favoritoToggled.emit(pokemon);
  }

  async setOpen(pokemon: any){
    const modal = await this.modalCrtl.create({
      component: DetalhesModalComponent,
      componentProps: {
        pokemon: pokemon
      }
    });
    modal.present();
  }
}