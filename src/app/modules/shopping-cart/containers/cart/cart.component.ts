import { Component, OnInit } from '@angular/core';
import { CartDTO } from '../../dtos/cart.dto';
import { Store } from '@ngxs/store';
import * as cartActions from '../../store/cart.actions';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { CartState } from '../../store/cart.store';
import { CartItemDTO } from '../../dtos/cart-item.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartSneakers$: Observable<SneakerDTO[]>;

  constructor(private store: Store) {
    this.cartSneakers$ = this.store.select(CartState.cartSneakers);
  }

  ngOnInit(): void {
    const cartFromStorage = localStorage.getItem('cart');
    console.log(cartFromStorage);
    if (cartFromStorage) {
      const items = JSON.parse(cartFromStorage) as CartItemDTO[];
      const sneakerIds = items.map((item) => item.sneakerId);
      this.store.dispatch(new cartActions.LoadCartSneakers(sneakerIds));
    }
  }

  fetchSneakerQuantity(sneakerId: number): number {
    const cartFromStorage = localStorage.getItem('cart');
    const items = JSON.parse(cartFromStorage!) as CartItemDTO[];
    return items.filter((item) => item.sneakerId === sneakerId)[0].size;
  }

  removeItem(sneakerId: number) {
    const cartFromStorage = localStorage.getItem('cart');
    const items = JSON.parse(cartFromStorage!) as CartItemDTO[];
    const newCart = items.filter((item) => item.sneakerId !== sneakerId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.store.dispatch(new cartActions.RemoveSneaker(sneakerId));
  }
}
