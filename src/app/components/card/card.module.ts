import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { DetalhesModalModule } from '../detalhes-modal/detalhes-modal.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, IonicModule, DetalhesModalModule],
  exports: [CardComponent]
})
export class CardModule {}