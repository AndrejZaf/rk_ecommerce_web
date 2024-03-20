import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private storageSub = new BehaviorSubject<string | null>(null);

  constructor() {}

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(cartItem: any): void {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      const items = JSON.parse(cartFromStorage);
      const itemExists = items.filter(
        (item: any) => item.sneakerId === cartItem.sneakerId
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
    const items = JSON.parse(cartFromStorage!);
    const newCart = items.filter((item: any) => item.sneakerId !== sneakerId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.storageSub.next('cart'); // Notify subscribers about the change
  }
}
