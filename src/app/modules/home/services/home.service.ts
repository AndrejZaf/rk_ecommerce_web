import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dtos/sneaker.dto';
import { Observable } from 'rxjs';
import { PremiumSneakerDTO } from '../dtos/premium-sneaker.dto';
import { environment } from 'src/environments/environment';

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
      `${environment.apiUrl}/api/inventory/sneakers?page=0&size=6`
    );
  }

  loadPremiumSneaker(): Observable<PremiumSneakerDTO> {
    return this.http.get<PremiumSneakerDTO>(
      `${environment.apiUrl}/api/inventory/sneakers/premium`
    );
  }
}
