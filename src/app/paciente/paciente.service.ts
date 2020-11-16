import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PEDIDO_EXAME_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler';

@Injectable()
export class PacienteService {

    private uri = `/pacientes`;

    constructor(private http: Http) {}

    findAll(search?: string): Observable<any[]> {
      return this.http.get(`${PEDIDO_EXAME_API}` + this.uri , {params: {q: search}})
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }

}
