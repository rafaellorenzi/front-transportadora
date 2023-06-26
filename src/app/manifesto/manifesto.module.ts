import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManifestoRoutingModule } from './manifesto-routing.module';
import { ManifestoFormPageComponent } from './components/manifesto-form-page/manifesto-form-page.component';
import { ManifestoListPageComponent } from './components/manifesto-list-page/manifesto-list-page.component';
import { ManifestoService } from './services/manifesto.service';
import { ManifestoFavoritosPageComponent } from './components/manifesto-favoritos-page/manifesto-favoritos-page.component';
import { TipoManifestoInterface } from './types/tipoManifesto.interface';
import { TipoManifestoService } from './services/tipoManifesto.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, ManifestoRoutingModule],
  declarations: [ManifestoListPageComponent, ManifestoFormPageComponent, ManifestoFavoritosPageComponent],
  providers: [ManifestoService, TipoManifestoService],
})
export class ManifestoModule {}
