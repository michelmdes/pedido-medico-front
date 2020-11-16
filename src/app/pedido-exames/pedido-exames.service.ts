import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {PEDIDO_EXAME_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler';

@Injectable()
export class PedidoExamesService {

  private uri = `/pedidos`;

  constructor(private http: Http) {}

  findAll(search?: string): Observable<any[]> {
    return this.http.get(`${PEDIDO_EXAME_API}` + this.uri, {params: {q: search}})
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  findByPacienteOrMedico(busca: any): Observable<any[]> {
    return this.http.get(`${PEDIDO_EXAME_API}` + this.uri + '/paciente-medico/', {params: busca})
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  save(pedido: any): Observable<any> {
    return this.http.post(`${PEDIDO_EXAME_API}` + this.uri, pedido)
      .catch(ErrorHandler.handleError);
  }

    /*restaurantById(id: string): Observable<Restaurant> {
      return this.http.get(`${PEDIDO_EXAME_API}/restaurants/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }*/

    /*reviewsOfRestaurant(id: string): Observable<any> {
      return this.http.get(`${BANCO_API}/restaurants/${id}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
      return this.http.get(`${BANCO_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }*/

}
