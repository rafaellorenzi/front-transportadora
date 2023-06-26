import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManifestoService } from '../../services/manifesto.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { CidadeInterface } from 'src/app/motorista/types/cidade.interface';
import { CidadeService } from 'src/app/motorista/services/cidade.service';
import { MotoristaInterface } from 'src/app/motorista/types/motorista.interface';
import { MotoristaService } from 'src/app/motorista/services/motorista.service';
import { TipoManifestoInterface } from '../../types/tipoManifesto.interface';
import { TipoManifestoService } from '../../services/tipoManifesto.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-manifesto-form-page',
  templateUrl: './manifesto-form-page.component.html',
})
export class ManifestoFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  manifestoForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number
  cidadeDestino: CidadeInterface[] = [];
  cidadeOrigem: CidadeInterface[] = [];
  tipoManifesto: TipoManifestoInterface[] = [];
  motorista: MotoristaInterface [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private manifestoService: ManifestoService,
    private alertController: AlertController,
    private cidadeService: CidadeService,
    private tipoManifestoService: TipoManifestoService,
    private motoristaService: MotoristaService,
    private loadingService: LoadingService,
  ) {
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadCidade();
    this.loadMotorista();
    this.loadtipoManifesto();
    this.loadManifestoOnEditMode()
  }

  private async loadCidade() {
    this.loadingService.on();
    this.subscription.add(
      this.cidadeService.getCidade().subscribe((response) => {
        this.cidadeOrigem = response;
        this.cidadeDestino = response;
        this.loadingService.off();
      })
    );
  }

  private async loadtipoManifesto() {
    this.loadingService.on();
    this.subscription.add(
      this.tipoManifestoService.getTipoManifesto().subscribe((response) => {
        this.tipoManifesto = response;
        this.loadingService.off();
      })
    );
  }
  private async loadMotorista() {
    this.loadingService.on();
    this.subscription.add(
      this.motoristaService.getMotoristas().subscribe((response) => {
        this.motorista = response;
        this.loadingService.off();
      })
    );
  }
  private loadManifestoOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.manifestoService.getManifesto(this.id).subscribe((manifesto) => {
          this.manifestoForm.patchValue({
            tipoManifesto: manifesto.tipoManifesto,
            cidadeOrigem: manifesto.cidadeOrigem,
            cidadeDestino: manifesto.cidadeDestino,
            dataSaida: manifesto.dataSaida,
            dataChegada: manifesto.dataChegada,
            motorista: manifesto.motorista,
            valorFrete: manifesto.valorFrete,
            valorPedagio: manifesto.valorPedagio,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.manifestoForm = this.formBuilder.group({
      tipoManifesto: '',
      cidadeOrigem: '',
      cidadeDestino: '',
      dataSaida: '2023-06-25',
      dataChegada: '2023-06-26',
      motorista: '',
      valorFrete: '1000',
      valorPedagio: '20',
    })
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.manifestoService.save(this.manifestoForm.value).subscribe(
          () => {
            this.router.navigate(['./manifestos'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do manifesto',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.manifestoService.update({
        ...this.manifestoForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./manifestos'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do manifesto',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./manifestos'])
  }

  compareWith(o1: CidadeInterface, o2: CidadeInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  compareWiths(o1: TipoManifestoInterface, o2: TipoManifestoInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  compareWithss(o1: MotoristaInterface, o2: MotoristaInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
