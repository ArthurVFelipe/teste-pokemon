import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';
import { CardModule } from '../components/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule,
    CardModule
  ],
  declarations: [ListaPage]
})
export class ListaPageModule {}
