import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as sneakersActions from '../../store/store/sneaker.actions';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import { SneakerState } from '../../store/store/sneaker.store';
import { LoadSneakersPage } from './../../store/store/sneaker.actions';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.scss'],
})
export class SneakersComponent implements OnInit {
  public sneakers$: Observable<SneakerDTO[]>;

  constructor(private store: Store) {
    this.sneakers$ = this.store.select(SneakerState.sneakers);
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(new sneakersActions.LoadSneakersPage());
  }
}
