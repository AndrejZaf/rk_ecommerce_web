import { Component, OnInit } from '@angular/core';
import { CartDTO } from '../../dtos/cart.dto';
import { Store } from '@ngxs/store';
import * as cartActions from '../../store/cart.actions';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { CartState } from '../../store/cart.store';
import { CartItemDTO } from '../../dtos/cart-item.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartSneakers$: Observable<SneakerDTO[]>;
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(private store: Store, private fb: FormBuilder) {
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
    console.log(this.form);
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }
  }
}
