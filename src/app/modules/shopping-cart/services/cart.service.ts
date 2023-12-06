import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICartService {
  getSneakersForCart(sneakerIds: number[]): Observable<SneakerDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class CartService implements ICartService {
  constructor(private http: HttpClient) {}

  getSneakersForCart(sneakerIds: number[]): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      `http://localhost:8080/api/inventory/sneaker/cart?ids=${sneakerIds}`
    );
  }
}
