import { Injectable } from '@angular/core';
import { SneakerDTO } from '../../home/dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BrandDTO } from '../dtos/brand.dto';

interface ISneakerService {
  loadSneakersForHomepage(): Observable<SneakerDTO[]>;
  loadSelectedSneaker(id: number): Observable<SneakerDTO>;
  loadSneakers(page: number, size: number): Observable<SneakerDTO[]>;
  loadBrands(): Observable<BrandDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerService implements ISneakerService {
  constructor(private http: HttpClient) {}

  loadBrands(): Observable<BrandDTO[]> {
    return this.http.get<BrandDTO[]>('http://localhost:8080/api/brand');
  }

  loadSneakersForHomepage(): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>('http://localhost:8080/api/sneaker');
  }

  loadSelectedSneaker(id: number): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>(`http://localhost:8080/api/sneaker/${id}`);
  }

  loadSneakers(page: number, size: number): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      `http://localhost:8080/api/sneaker?page=${page}&size=${size}`
    );
  }
}
