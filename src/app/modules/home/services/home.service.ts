import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { PremiumSneakerDTO } from '../dtos/premium-sneaker.dto';

interface IHomeService {
  loadSneakers(): Observable<SneakerDTO[]>;
  loadPremiumSneaker(): Observable<PremiumSneakerDTO>;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService implements IHomeService {
  constructor(private http: HttpClient) {}

  loadSneakers(): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      'http://localhost:8080/api/inventory/sneaker?page=0&size=6'
    );
  }

  loadPremiumSneaker(): Observable<PremiumSneakerDTO> {
    return this.http.get<PremiumSneakerDTO>(
      'http://localhost:8080/api/inventory/sneaker/premium'
    );
  }
}
