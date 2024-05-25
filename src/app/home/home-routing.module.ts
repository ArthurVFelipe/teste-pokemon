import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FavoritosPage } from '../favoritos/favoritos.page';
import { ListaPage } from '../lista/lista.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo:'lista', pathMatch: 'full' },
      { path: 'lista', component: ListaPage },
      { path: 'favoritos', component: FavoritosPage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
