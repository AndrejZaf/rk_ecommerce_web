import { Component, Input } from '@angular/core';
import { SneakerDTO } from '../../dtos/sneaker.dto';
import * as sneakersActions from '../../store/store/sneaker.actions';
import { Store } from '@ngxs/store';
import { SneakerState } from '../../store/store/sneaker.store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input()
  sneakers: SneakerDTO[] | null = [];
  hasMorePages$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.hasMorePages$ = this.store.select(SneakerState.hasMorePages);
  }

  onScroll() {
    this.store.dispatch(new sneakersActions.LoadSneakersPage());
  }

  redirectToSneaker(sneakerId: number) {
    this.router.navigate([`/sneakers/${sneakerId}`]);
  }
}
