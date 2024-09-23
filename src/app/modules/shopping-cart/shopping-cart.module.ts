import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './containers/cart/cart.component';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './store/cart.store';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { TotalInfoComponent } from './components/total-info/total-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessfulPurchaseComponent } from './containers/successful-purchase/successful-purchase.component';
import { FailedPurchaseComponent } from './containers/failed-purchase/failed-purchase.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductGridComponent } from './components/product-grid/product-grid.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/shopping-cart/', '.json');
}

@NgModule({
  declarations: [
    CartComponent,
    ProductGridComponent,
    DeliveryInfoComponent,
    TotalInfoComponent,
    SuccessfulPurchaseComponent,
    FailedPurchaseComponent,
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([CartState]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
      isolate: true,
    }),
  ],
})
export class ShoppingCartModule {}
