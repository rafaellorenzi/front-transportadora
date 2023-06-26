import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./motorista/motorista.module').then(m => m.MotoristaModule)
  },
  {
    path: 'manifestos',
    loadChildren: () => import('./manifesto/manifesto.module').then(m => m.ManifestoModule)
  }

];

export class AppRoutingModule {}
