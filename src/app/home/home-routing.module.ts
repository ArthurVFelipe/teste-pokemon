import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DetalhesPage } from '../detalhes/detalhes.page';
import { FavoritosPage } from '../favoritos/favoritos.page';
import { ListaPage } from '../lista/lista.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'lista', component: ListaPage },
      { path: 'detalhes', component: DetalhesPage },
      { path: 'favoritos', component: FavoritosPage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
