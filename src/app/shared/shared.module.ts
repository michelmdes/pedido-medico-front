import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';

/*import {OrderService} from '../order/order.service';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {RestaurantsService} from '../restaurants/restaurants.service';*/
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import {NotificationService} from './messages/notification.service';
import {EstadosService} from '../estados/estados.service';
import {PedidoExamesService} from '../pedido-exames/pedido-exames.service';
import {PacienteService} from '../paciente/paciente.service';
import {MedicoService} from '../medico/medico.service';
import {CategoriaService} from '../categoria/categoria.service';

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, SnackbarComponent,
            RatingComponent, CommonModule,
            FormsModule, ReactiveFormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [PedidoExamesService, PacienteService, MedicoService, CategoriaService, EstadosService,NotificationService]
        // ShoppingCartService, RestaurantsService, OrderService ]
    };
  }
}
