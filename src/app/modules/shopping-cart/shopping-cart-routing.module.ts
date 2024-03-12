import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './containers/cart/cart.component';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { SuccessfulPurchaseComponent } from './containers/successful-purchase/successful-purchase.component';
import { FailedPurchaseComponent } from './containers/failed-purchase/failed-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
  {
    path: ':id/checkout',
    component: CheckoutComponent,
  },
  {
    path: 'success/:id',
    component: SuccessfulPurchaseComponent,
  },
  {
    path: 'failure/:id',
    component: FailedPurchaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
