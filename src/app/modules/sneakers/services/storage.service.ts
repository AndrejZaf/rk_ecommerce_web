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
  addItemsToCart(item: CartItemDTO): void {}
}
