import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderVerificationDTO } from '../dtos/order-verification.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';

interface IOrderService {
  fetchOrder(id: string): Observable<OrderVerificationDTO>;
  getSneakersForOrder(sneakerIds: number[]): Observable<SneakerDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  constructor(private http: HttpClient) {}

  fetchOrder(id: string): Observable<OrderVerificationDTO> {
    return this.http.get<OrderVerificationDTO>(
      `http://localhost:8080/api/order/${id}`
    );
  }

  getSneakersForOrder(sneakerIds: number[]): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      `http://localhost:8080/api/inventory/sneaker/cart?ids=${sneakerIds}`
    );
  }
}
