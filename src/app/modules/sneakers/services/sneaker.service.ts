import { Injectable } from '@angular/core';
import { SneakerDTO } from '../../home/dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ISneakerService {
  loadSneakers(): Observable<SneakerDTO[]>;
  loadSelectedSneaker(id: number): Observable<SneakerDTO>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerService implements ISneakerService {
  constructor(private http: HttpClient) {}

  loadSneakers(): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>('http://localhost:8080/api/sneaker');
  }

  loadSelectedSneaker(id: number): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>(`http://localhost:8080/api/sneaker/${id}`);
  }
}
