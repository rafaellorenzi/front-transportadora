import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MotoristaService } from '../../services/motorista.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { CidadeInterface } from '../../types/cidade.interface';
import { CidadeService } from '../../services/cidade.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-motorista-form-page',
  templateUrl: './motorista-form-page.component.html',
})
export class MotoristaFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  motoristaForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number
  cidade: CidadeInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private motoristaService: MotoristaService,
    private alertController: AlertController,
    private cidadeService: CidadeService,
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
    this.loadMotoristaOnEditMode()
  }

  private async loadCidade() {
    this.loadingService.on();
    this.subscription.add(
      this.cidadeService.getCidade().subscribe((response) => {
        this.cidade = response;
        this.loadingService.off();
      })
    );
  }

  private loadMotoristaOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.motoristaService.getMotorista(this.id).subscribe((motorista) => {
          this.motoristaForm.patchValue({
            nome: motorista.nome,
            dataNascimento: motorista.dataNascimento,
            endereco: motorista.endereco,
            tipoHabilitacao: motorista.tipoHabilitacao,
            dataVencimento: motorista.dataVencimento,
            cidade: motorista.cidade,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.motoristaForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      dataNascimento: '1998-11-19',
      endereco: 'Rua goias',
      tipoHabilitacao: 'AE',
      dataVencimento: '2030-11-19',
      cidade: '',
    })
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.motoristaService.save(this.motoristaForm.value).subscribe(
          () => {
            this.router.navigate(['./motoristas'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do motorista',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.motoristaService.update({
        ...this.motoristaForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./motoristas'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do autor',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./motoristas'])
  }

  compareWith(o1: CidadeInterface, o2: CidadeInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


}
