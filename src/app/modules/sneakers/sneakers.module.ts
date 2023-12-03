import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SneakersRoutingModule } from './sneakers-routing.module';
import { SneakersComponent } from './containers/sneakers/sneakers.component';
import { FilterComponent } from './components/filter/filter.component';
import { GridComponent } from './components/grid/grid.component';
import { GenderFilterComponent } from './components/gender-filter/gender-filter.component';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { SizeFilterComponent } from './components/size-filter/size-filter.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SneakersComponent,
    FilterComponent,
    GridComponent,
    GenderFilterComponent,
    BrandFilterComponent,
    SizeFilterComponent,
  ],
  imports: [CommonModule, SneakersRoutingModule, SharedModule],
})
export class SneakersModule {}
