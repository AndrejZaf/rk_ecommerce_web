import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [SneakerCardComponent, ConfirmModalComponent],
  exports: [SneakerCardComponent],
  imports: [CommonModule],
})
export class SharedModule {}
