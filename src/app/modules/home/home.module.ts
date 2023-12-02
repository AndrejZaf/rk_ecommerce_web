import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeScreenComponent } from './containers/home-screen/home-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeScreenComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
