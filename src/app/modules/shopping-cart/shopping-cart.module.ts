import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './containers/cart/cart.component';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './store/cart.store';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { TotalInfoComponent } from './components/total-info/total-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartComponent,
    ProductGridComponent,
    DeliveryInfoComponent,
    TotalInfoComponent,
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([CartState]),
  ],
})
export class ShoppingCartModule {}
