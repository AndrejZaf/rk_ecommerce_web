import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemDTO } from 'src/app/modules/sneakers/dtos/cart-item.dto';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private storageSub = new BehaviorSubject<string | null>(null);

  watchStorage(): Observable<string | null> {
    return this.storageSub.asObservable();
  }

  setItem(cartItem: CartItemDTO): void {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      const items = JSON.parse(cartFromStorage);
      const itemExists = items.filter(
        (item: CartItemDTO) => item.sneakerId === cartItem.sneakerId
      )[0];
      if (itemExists) {
        itemExists.size = cartItem.size;
      } else {
        items.push(cartItem);
      }
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      const newCart = [cartItem];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    this.storageSub.next('cart'); // Notify subscribers about the change
  }

  removeItem(sneakerId: number): void {
    const cartFromStorage = localStorage.getItem('cart');
    const items = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const newCart = items.filter(
      (item: CartItemDTO) => item.sneakerId !== sneakerId
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.storageSub.next('cart'); // Notify subscribers about the change
  }
}
