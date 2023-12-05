import { Component, Input } from '@angular/core';
import { BrandDTO } from '../../dtos/brand.dto';
import { Store } from '@ngxs/store';
import { SneakerState } from '../../store/sneaker.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public brands$: Observable<BrandDTO[]>;
  public sizes$: Observable<number[]>;

  constructor(private store: Store) {
    this.brands$ = this.store.select(SneakerState.brands);
    this.sizes$ = this.store.select(SneakerState.sizes);
  }
}
