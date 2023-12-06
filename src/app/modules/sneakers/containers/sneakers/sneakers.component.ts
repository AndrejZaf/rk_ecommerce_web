import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as sneakersActions from '../../store/sneaker.actions';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { SneakerState } from '../../store/sneaker.store';
import { BrandDTO } from '../../dtos/brand.dto';
@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.scss'],
})
export class SneakersComponent implements OnInit, OnDestroy {
  public sneakers$: Observable<SneakerDTO[]>;
  public hasMorePages$: Observable<boolean>;

  constructor(private store: Store) {
    this.sneakers$ = this.store.select(SneakerState.sneakers);
    this.hasMorePages$ = this.store.select(SneakerState.hasMorePages);
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(new sneakersActions.LoadSneakersPage());
    this.store.dispatch(new sneakersActions.LoadBrands());
    this.store.dispatch(new sneakersActions.LoadSizes());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new sneakersActions.ResetStore());
  }

  onScroll() {
    this.store.dispatch(new sneakersActions.LoadSneakersPage());
  }
}
