import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeScreenComponent } from './containers/home-screen/home-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeState } from './store/home.store';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeScreenComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forFeature([HomeState]),
  ],
})
export class HomeModule {}
