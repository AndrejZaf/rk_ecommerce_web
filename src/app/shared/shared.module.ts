import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [SneakerCardComponent, ConfirmModalComponent],
  exports: [SneakerCardComponent],
  imports: [CommonModule, ToastrModule.forRoot()],
})
export class SharedModule {}
