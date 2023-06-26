import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MotoristaRoutingModule } from './motorista-routing.module';
import { MotoristaFormPageComponent } from './components/motorista-form-page/motorista-form-page.component';
import { MotoristaListPageComponent } from './components/motorista-list-page/motorista-list-page.component';
import { MotoristaService } from './services/motorista.service';
import { MotoristaFavoritosPageComponent } from './components/motorista-favoritos-page/motorista-favoritos-page.component';
import { CidadeInterface } from './types/cidade.interface';
import { CidadeService } from './services/cidade.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, MotoristaRoutingModule],
  declarations: [MotoristaListPageComponent, MotoristaFormPageComponent, MotoristaFavoritosPageComponent],
  providers: [MotoristaService, CidadeService],
})
export class MotoristaModule {}
