import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SneakersComponent } from './containers/sneakers/sneakers.component';
import { SelectedSneakerComponent } from './containers/selected-sneaker/selected-sneaker.component';

const routes: Routes = [
  {
    path: '',
    component: SneakersComponent,
  },
  {
    path: ':id',
    component: SelectedSneakerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SneakersRoutingModule {}
