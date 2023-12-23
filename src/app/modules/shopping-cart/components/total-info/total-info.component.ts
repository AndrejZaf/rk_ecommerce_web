import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';

@Component({
  selector: 'app-total-info',
  templateUrl: './total-info.component.html',
  styleUrls: ['./total-info.component.scss'],
})
export class TotalInfoComponent {
  @Output()
  checkout: EventEmitter<void> = new EventEmitter();
  @Input()
  isValid: boolean;
  @Input()
  sneakers: SneakerDTO[] | null;

  calculateTotalPrice(): number {
    if (this.sneakers?.length) {
      return this.sneakers
        .map((sneaker) => sneaker.price)
        .reduce((total, item) => total + item);
    }
    return 0;
  }
}
