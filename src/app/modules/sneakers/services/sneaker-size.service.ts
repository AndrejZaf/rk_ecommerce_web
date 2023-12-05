import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ISneakerSizeService {
  loadSneakerSizes(): Observable<number[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerSizeService implements ISneakerSizeService {
  constructor(private http: HttpClient) {}

  loadSneakerSizes(): Observable<number[]> {
    return this.http.get<number[]>('http://localhost:8080/api/sneaker-size');
  }
}
