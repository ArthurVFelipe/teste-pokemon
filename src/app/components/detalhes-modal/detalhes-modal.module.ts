import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetalhesModalComponent } from './detalhes-modal.component';

@NgModule({
  declarations: [DetalhesModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [DetalhesModalComponent]
})
export class DetalhesModalModule {}