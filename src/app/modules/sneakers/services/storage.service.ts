import { Injectable } from '@angular/core';
import { CartItemDTO } from '../dtos/cart-item.dto';
import { CartDTO } from './../dtos/cart.dto';

interface IStorageService {
  addItemsToCart(item: CartItemDTO): void;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService implements IStorageService {
  addItemsToCart(cartItem: CartItemDTO): void {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      const items = JSON.parse(cartFromStorage) as CartItemDTO[];
      const itemExists = items.filter(
        (item) => item.sneakerId === cartItem.sneakerId
      )[0];
      console.log(itemExists);
      if (itemExists) {
        itemExists.size = cartItem.size;
      } else {
        items.push(cartItem);
      }
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      const newCart: CartItemDTO[] = [cartItem];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }
}
