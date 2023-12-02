import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './containers/home-screen/home-screen.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
