import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderPreviewDTO } from '../dtos/order-preview.dto';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { environment } from 'src/environments/environment';

interface IOrderService {
  fetchOrder(id: string): Observable<OrderPreviewDTO>;
  getSneakersForOrder(sneakerIds: number[]): Observable<SneakerDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  constructor(private http: HttpClient) {}

  fetchOrder(id: string): Observable<OrderPreviewDTO> {
    return this.http.get<OrderPreviewDTO>(
      `${environment.apiUrl}/api/orders/${id}`
    );
  }

  getSneakersForOrder(sneakerIds: number[]): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      `${environment.apiUrl}/api/inventory/sneakers/cart?ids=${sneakerIds}`
    );
  }
}
