import { Component, Input } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { CartItemDTO } from '../../dtos/cart-item.dto';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CartStorageService } from 'src/app/shared/services/cart-storage.service';
import { Store } from '@ngxs/store';
import * as cartActions from '../../store/cart.actions';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent {
  @Input()
  cartSneakers: SneakerDTO[] | null;

  constructor(
    private toastService: ToastService,
    private cartStorageService: CartStorageService,
    private store: Store
  ) {}

  fetchSneakerQuantity(sneakerId: number): number {
    const cartFromStorage = localStorage.getItem('cart');
    const items = JSON.parse(cartFromStorage!) as CartItemDTO[];
    return items.filter((item) => item.sneakerId === sneakerId)[0].size;
  }

  removeItem(sneakerId: number) {
    this.cartStorageService.removeItem(sneakerId);
    this.store
      .dispatch(new cartActions.RemoveSneaker(sneakerId))
      .subscribe(() =>
        this.toastService.show('Successfully removed sneaker from cart', '')
      );
  }
}
