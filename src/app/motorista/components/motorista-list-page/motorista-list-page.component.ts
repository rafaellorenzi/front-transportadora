import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { MotoristaService } from '../../services/motorista.service';
import { MotoristaInterface } from '../../types/motorista.interface';

@Component({
  selector: 'app-motorista-list-page',
  templateUrl: './motorista-list-page.component.html',
})
export class MotoristaListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  motoristas: MotoristaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private motoristaService: MotoristaService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.motoristas = [];
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

    const subscription = this.motoristaService.getMotoristas()
      .subscribe(async (motoristas) => {
        this.motoristas = motoristas;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de motoristas carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de motoristas',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(motorista: MotoristaInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o motorista ${motorista.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.motoristaService.remove(motorista).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  favorite(motorista: MotoristaInterface) {
    const motoristasFavoritesLocalStorage = window.localStorage.getItem('motoristasFavoritos');
    let arrayMotoristasFavoritos = motoristasFavoritesLocalStorage ? JSON.parse(motoristasFavoritesLocalStorage) : [];

    const contain = arrayMotoristasFavoritos.some((a: MotoristaInterface) => a.id === motorista.id);
    arrayMotoristasFavoritos = contain ? arrayMotoristasFavoritos : [...arrayMotoristasFavoritos, motorista]

    window.localStorage.setItem('motoristasFavoritos', JSON.stringify(arrayMotoristasFavoritos))
  }
}
