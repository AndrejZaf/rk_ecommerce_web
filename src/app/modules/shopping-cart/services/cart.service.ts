import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../dtos/order.dto';
import { OrderIdentifierDTO } from '../dtos/order-identifier.dto';
import { StripeSessionDTO } from '../dtos/stripe-session.dto';
import { environment } from 'src/environments/environment';

interface ICartService {
  getSneakersForCart(sneakerIds: number[]): Observable<SneakerDTO[]>;
  createOrder(orderDTO: OrderDTO): Observable<OrderIdentifierDTO>;
  payOrder(id: string): Observable<StripeSessionDTO>;
}

@Injectable({
  providedIn: 'root',
})
export class CartService implements ICartService {
  constructor(private http: HttpClient) {}

  getSneakersForCart(sneakerIds: number[]): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      `${environment.apiUrl}/api/inventory/sneakers/cart?ids=${sneakerIds}`
    );
  }

  createOrder(orderDTO: OrderDTO): Observable<OrderIdentifierDTO> {
    return this.http.post<OrderIdentifierDTO>(
      `${environment.apiUrl}/api/orders`,
      JSON.stringify(orderDTO),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  payOrder(id: string): Observable<StripeSessionDTO> {
    return this.http.get<StripeSessionDTO>(
      `${environment.apiUrl}/api/payments/${id}`
    );
  }
}
