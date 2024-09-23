import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ISneakerSizeService {
  loadSneakerSizes(): Observable<number[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerSizeService implements ISneakerSizeService {
  constructor(private http: HttpClient) {}

  loadSneakerSizes(): Observable<number[]> {
    return this.http.get<number[]>(
      `${environment.apiUrl}/api/inventory/sneaker-sizes`
    );
  }
}
