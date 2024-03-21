import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsPageComponent } from './containers/brands-page/brands-page.component';


@NgModule({
  declarations: [
    BrandsPageComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule
  ]
})
export class BrandsModule { }
