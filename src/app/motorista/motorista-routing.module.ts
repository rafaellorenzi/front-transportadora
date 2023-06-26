import { MotoristaFormPageComponent } from './components/motorista-form-page/motorista-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MotoristaListPageComponent } from './components/motorista-list-page/motorista-list-page.component';
import { MotoristaFavoritosPageComponent } from './components/motorista-favoritos-page/motorista-favoritos-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: MotoristaListPageComponent,
  },
  {
    path: 'cadastro',
    component: MotoristaFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: MotoristaFormPageComponent,
  },
  {
    path: 'favoritos',
    component: MotoristaFavoritosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristaRoutingModule {}
