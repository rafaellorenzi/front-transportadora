import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Motoristas', url: '/motoristas', icon: 'paper-plane' },
    { title: 'Manifestos', url: '/manifestos', icon: 'archive' },
    { title: 'Motoristas Favoritos', url: '/motorista/favoritos', icon: 'archive' },
    { title: 'Manifestos Favoritos', url: '/manifesto/favoritos', icon: 'archive' },
  ];
  public labels = ['', '', '', '', '', ''];
  constructor() {}
}
