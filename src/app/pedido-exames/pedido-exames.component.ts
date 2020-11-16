import {Component, forwardRef, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

import {PedidoExamesService} from './pedido-exames.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {PacienteService} from '../paciente/paciente.service';
import {MedicoService} from '../medico/medico.service';
import {CategoriaService} from '../categoria/categoria.service';
import {RadioComponent} from '../shared/radio/radio.component';
import {RadioOption} from '../shared/radio/radio-option.model';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/messages/notification.service';

@Component({
  selector: 'pedido-exames',
  templateUrl: './pedido-exames.component.html',
  providers: [PedidoExamesService, PacienteService, MedicoService]
})
export class PedidoExamesComponent implements OnInit {

  pacientes: any[] = [];
  medicos: any[] = [];
  categorias: any[] = [];
  examesSelecionados: number[] = [];
  form: FormGroup;

  constructor(private pedidoService: PedidoExamesService,
              private pacienteService: PacienteService,
              private medicoService: MedicoService,
              private categoriaService: CategoriaService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      medico: this.fb.control('', [Validators.required]),
      paciente: this.fb.control('', [Validators.required]),
      exames: this.fb.control([]),
      observacao: this.fb.control('')
    });

    this.preencherDependencias();
  }

  private preencherDependencias() {

    this.pacienteService.findAll().subscribe(dados => {
      this.pacientes = dados;
    });

    this.medicoService.findAll().subscribe(dados => {
      this.medicos = dados;
    });

    this.categoriaService.findAll().subscribe(dados => {
      this.categorias = dados;
      this.categorias.forEach(cat => {
        cat.examesOptions = cat.exames.map(c => new RadioOption(c.nome, c.id));
      });
    });
  }

  onCheckChange(event) {
    if (event.target.checked) {
      this.examesSelecionados.push(event.target.value);
    } else {
      const index = this.examesSelecionados.indexOf(event.target.value);
      if (index !== -1) {
        this.examesSelecionados.splice(index, 1);
      }
    }
  }

  gravarPedido() {
    let pedido: any = {};
    pedido.paciente = {id: +this.form.get('paciente').value};
    pedido.medico = {id: +this.form.get('medico').value};
    pedido.exames = this.examesSelecionados.map(e => ({id: +e}));
    pedido.observacao = this.form.get('observacao').value;

    this.pedidoService.save(pedido).subscribe(response => {
      if (response.status === 201) {
        this.notificationService.notify(`Pedido de exame gerado com sucesso!`);
        this.router.navigate(['/list-pedido-exames']);
      } else {
        this.notificationService.notify(`Ocorreu um erro inesperado. Tente novamente mais tarde.`);
      }
    });
  }

}
