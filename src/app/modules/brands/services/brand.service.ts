import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IBrandService {
  // loadBrands(): Observable<BrandDTO[]>;
}
@Injectable({
  providedIn: 'root',
})
export class BrandService implements IBrandService {
  constructor(private http: HttpClient) {}

  // loadBrands(): Observable<BrandDTO[]> {
  //   return this.http.get<BrandDTO[]>(
  //     'http://localhost:8080/api/inventory/brand'
  //   );
  // }
}
