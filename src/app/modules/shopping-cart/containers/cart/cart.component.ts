import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as cartActions from '../../store/cart.actions';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { CartState } from '../../store/cart.store';
import { CartItemDTO } from '../../dtos/cart-item.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryInfoDTO } from '../../dtos/delivery-data.dto';
import { OrderDTO } from '../../dtos/order.dto';
import { CartService } from '../../services/cart.service';
import { SneakerOrderDTO } from '../../dtos/sneaker-order.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartSneakers$: Observable<SneakerDTO[]>;
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartSneakers$ = this.store.select(CartState.cartSneakers);
    this.form = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
      street: this.fb.control('', [Validators.required]),
      postalCode: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const cartFromStorage = localStorage.getItem('cart');
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

  checkout() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    const cartFromStorage = localStorage.getItem('cart');
    const items = JSON.parse(cartFromStorage!) as CartItemDTO[];
    const deliveryInfo: DeliveryInfoDTO = {
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value,
      email: this.form.controls['email'].value,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      postalCode: this.form.controls['postalCode'].value,
      street: this.form.controls['street'].value,
    };

    const sneakers = items.map(item => {
      const sneaker: SneakerOrderDTO = {
        id: item.sneakerId,
        size: item.size,
      }
      return sneaker;
    })

    const order: OrderDTO = {
      deliveryInfo,
      sneakers: sneakers,
    };
    this.cartService.createOrder(order).subscribe((order) => {
      window.location.href = order.sessionUrl;
    });
  }
}
