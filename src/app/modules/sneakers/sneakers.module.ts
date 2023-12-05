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
import { SelectedSneakerComponent } from './containers/selected-sneaker/selected-sneaker.component';
import { SneakerState } from './store/store/sneaker.store';
import { NgxsModule } from '@ngxs/store';
import { SelectedSneakerSizeComponent } from './components/selected-sneaker-size/selected-sneaker-size.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SneakersComponent,
    FilterComponent,
    GridComponent,
    GenderFilterComponent,
    BrandFilterComponent,
    SizeFilterComponent,
    SelectedSneakerComponent,
    SelectedSneakerSizeComponent,
  ],
  imports: [
    CommonModule,
    SneakersRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([SneakerState]),
  ],
})
export class SneakersModule {}
