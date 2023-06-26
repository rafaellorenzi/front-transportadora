import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ManifestoService } from '../../services/manifesto.service';
import { ManifestoInterface } from '../../types/manifesto.interface';

@Component({
  selector: 'app-manifesto-list-page',
  templateUrl: './manifesto-list-page.component.html',
})
export class ManifestoListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  manifestos: ManifestoInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private manifestoService: ManifestoService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.manifestos = [];
  }

  ionViewWillEnter(): void {
    this.listar();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.manifestoService.getManifestos()
      .subscribe(async (manifestos) => {
        this.manifestos = manifestos;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de manifestos carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de manifestos',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(manifesto: ManifestoInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o manifesto ${manifesto.valorFrete}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.manifestoService.remove(manifesto).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  favorite(manifesto: ManifestoInterface) {
    const manifestosFavoritesLocalStorage = window.localStorage.getItem('manifestosFavoritos');
    let arrayManifestosFavoritos = manifestosFavoritesLocalStorage ? JSON.parse(manifestosFavoritesLocalStorage) : [];

    const contain = arrayManifestosFavoritos.some((a: ManifestoInterface) => a.id === manifesto.id);
    arrayManifestosFavoritos = contain ? arrayManifestosFavoritos : [...arrayManifestosFavoritos, manifesto]

    window.localStorage.setItem('manifestosFavoritos', JSON.stringify(arrayManifestosFavoritos))
  }
}
