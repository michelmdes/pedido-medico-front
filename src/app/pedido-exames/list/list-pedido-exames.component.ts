import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PedidoExamesService} from '../pedido-exames.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {PacienteService} from '../../paciente/paciente.service';
import {MedicoService} from '../../medico/medico.service';
import {NotificationService} from '../../shared/messages/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'list-pedido-exames',
  templateUrl: './list-pedido-exames.component.html',
  providers: [PedidoExamesService, PacienteService, MedicoService]
})
export class ListPedidoExamesComponent implements OnInit {

  pacientes: any[] = [];
  medicos: any[] = [];
  pedidos: any[] = [];
  form: FormGroup;

  constructor(private pedidoService: PedidoExamesService,
              private pacienteService: PacienteService,
              private medicoService: MedicoService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      idMedico: this.fb.control('', [Validators.required]),
      idPaciente: this.fb.control('', [Validators.required])
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

  }

  buscarPedidos() {
    this.pedidoService.findByPacienteOrMedico(this.form.value).subscribe(dados => {
      if (dados.length === 0) {
        this.notificationService.notify(`Nenhum registro encontrado.`);
      }
      this.pedidos = dados;
    });
  }

}
