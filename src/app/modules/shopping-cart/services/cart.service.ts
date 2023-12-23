import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../dtos/order.dto';
import { OrderIdentifierDTO } from '../dtos/order-identifier.dto';

interface ICartService {
  getSneakersForCart(sneakerIds: number[]): Observable<SneakerDTO[]>;
  createOrder(orderDTO: OrderDTO): Observable<OrderIdentifierDTO>;
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

  createOrder(orderDTO: OrderDTO): Observable<OrderIdentifierDTO> {
    return this.http.post<OrderIdentifierDTO>(`http://localhost:8080/api/order`, JSON.stringify(orderDTO), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}
