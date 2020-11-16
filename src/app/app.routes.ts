import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
/*import {RestaurantsComponent} from './restaurants/restaurants.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {MenuComponent} from './restaurant-detail/menu/menu.component';
import {ReviewsComponent} from './restaurant-detail/reviews/reviews.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';*/
import {NotFoundComponent} from './not-found/not-found.component';
import {EstadosComponent} from './estados/estados.component';
import {PedidoExamesComponent} from './pedido-exames/pedido-exames.component';
import {ListPedidoExamesComponent} from './pedido-exames/list/list-pedido-exames.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list-pedido-exames', component: ListPedidoExamesComponent},
  {path: 'pedido-exames', component: PedidoExamesComponent},
  {path: 'estados', component: EstadosComponent},
  /*{path: 'restaurants', component: RestaurantsComponent},
  {path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full'},
      {path: 'menu', component: MenuComponent},
      {path: 'reviews', component: ReviewsComponent}
    ]},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
  {path: 'order-summary', component: OrderSummaryComponent},*/
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
