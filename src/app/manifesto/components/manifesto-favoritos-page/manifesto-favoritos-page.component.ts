import { Component, OnInit } from "@angular/core";
import { ManifestoInterface } from "../../types/manifesto.interface";

@Component({
  selector: 'app-manifesto-favoritos-page',
  templateUrl: './manifesto-favoritos-page.component.html',
})
export class ManifestoFavoritosPageComponent implements OnInit {

  manifestos: ManifestoInterface[] = []

  ngOnInit(): void {
    const manifestosFavoritesLocalStorage = window.localStorage.getItem('manifestosFavoritos')
    this.manifestos = manifestosFavoritesLocalStorage ? JSON.parse(manifestosFavoritesLocalStorage) : [];
  }

  unfavorite(manifesto: ManifestoInterface) {
    this.manifestos = this.manifestos.filter(a => a.id !== manifesto.id);
    window.localStorage.setItem('manifestosFavoritos', JSON.stringify(this.manifestos));
  }
}
