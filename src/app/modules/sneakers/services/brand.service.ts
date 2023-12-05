import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandDTO } from '../dtos/brand.dto';
import { HttpClient } from '@angular/common/http';

interface IBrandService {
  loadBrands(): Observable<BrandDTO[]>;
}
@Injectable({
  providedIn: 'root',
})
export class BrandService implements IBrandService {
  constructor(private http: HttpClient) {}

  loadBrands(): Observable<BrandDTO[]> {
    return this.http.get<BrandDTO[]>('http://localhost:8080/api/brand');
  }
}
