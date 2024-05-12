import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsPageComponent } from './containers/brands-page/brands-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BrandsPageComponent],
  imports: [CommonModule, SharedModule, BrandsRoutingModule],
})
export class BrandsModule {}
