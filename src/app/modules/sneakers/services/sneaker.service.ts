import { Injectable } from '@angular/core';
import { SneakerDTO } from '../../home/dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ISneakerService {
  loadSneakersForHomepage(): Observable<SneakerDTO[]>;
  loadSelectedSneaker(id: number): Observable<SneakerDTO>;
  loadSneakers(
    page: number,
    size: number,
    brandIds?: number[],
    selectedSizes?: number[],
    selectedGenders?: string[]
  ): Observable<SneakerDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerService implements ISneakerService {
  constructor(private http: HttpClient) {}

  loadSneakersForHomepage(): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>(
      'http://localhost:8080/api/inventory/sneaker'
    );
  }

  loadSelectedSneaker(id: number): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>(
      `http://localhost:8080/api/inventory/sneaker/${id}`
    );
  }

  loadSneakers(
    page: number,
    size: number,
    brandIds?: number[],
    selectedSizes?: number[],
    selectedGenders?: string[]
  ): Observable<SneakerDTO[]> {
    let brandQuery = '';
    let sizeQuery = '';
    let genderQuery = '';
    if (brandIds?.length !== 0) {
      brandQuery = `&brandIds=${brandIds?.join()}`;
    }

    if (selectedSizes?.length !== 0) {
      sizeQuery = `&sizes=${selectedSizes?.join()}`;
    }

    if (selectedGenders?.length !== 0) {
      genderQuery = `&genders=${selectedGenders?.join()}`;
    }

    return this.http.get<SneakerDTO[]>(
      `http://localhost:8080/api/inventory/sneaker?page=${page}&size=${size}${brandQuery}${sizeQuery}${genderQuery}`
    );
  }
}
