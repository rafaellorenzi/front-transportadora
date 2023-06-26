import { ManifestoFormPageComponent } from './components/manifesto-form-page/manifesto-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ManifestoListPageComponent } from './components/manifesto-list-page/manifesto-list-page.component';
import { ManifestoFavoritosPageComponent } from './components/manifesto-favoritos-page/manifesto-favoritos-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: ManifestoListPageComponent,
  },
  {
    path: 'cadastro',
    component: ManifestoFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: ManifestoFormPageComponent,
  },
  {
    path: 'favoritos',
    component: ManifestoFavoritosPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManifestoRoutingModule {}
