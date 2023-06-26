import { Component, OnInit } from "@angular/core";
import { MotoristaInterface } from "../../types/motorista.interface";

@Component({
  selector: 'app-motorista-favoritos-page',
  templateUrl: './motorista-favoritos-page.component.html',
})
export class MotoristaFavoritosPageComponent implements OnInit {

  motoristas: MotoristaInterface[] = []

  ngOnInit(): void {
    const motoristasFavoritesLocalStorage = window.localStorage.getItem('motoristasFavoritos')
    this.motoristas = motoristasFavoritesLocalStorage ? JSON.parse(motoristasFavoritesLocalStorage) : [];
  }

  unfavorite(motorista: MotoristaInterface) {
    this.motoristas = this.motoristas.filter(a => a.id !== motorista.id);
    window.localStorage.setItem('motoristasFavoritos', JSON.stringify(this.motoristas));
  }
}
