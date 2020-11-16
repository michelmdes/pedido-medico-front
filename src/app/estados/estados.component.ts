import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {EstadosService} from './estados.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'estados',
  templateUrl: './estados.component.html',
  providers: [EstadosService]
})
export class EstadosComponent implements OnInit {

  dados: any[] = [];
  // dataSource = new MatTableDataSource<any>();

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private estadosService: EstadosService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.listarTodos();
    /*this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })*/

    /*this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(searchTerm =>
          this.estadosService
            .restaurants(searchTerm)
            .catch(error => Observable.from([])))
        .subscribe(restaurants => this.restaurants = restaurants)*/

   /* this.estadosService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);*/
  }

  private listarTodos() {
    this.estadosService.findAll().subscribe(dados => {
      console.log(dados);
      this.dados = dados;
    });
  }

  /*toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }*/

}
