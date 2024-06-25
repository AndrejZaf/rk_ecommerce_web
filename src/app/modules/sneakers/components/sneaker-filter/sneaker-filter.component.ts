import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import * as sneakersActions from '../../store/sneaker.actions';

@Component({
  selector: 'app-sneaker-filter',
  templateUrl: './sneaker-filter.component.html',
  styleUrls: ['./sneaker-filter.component.scss'],
})
export class SneakerFilterComponent {
  constructor(private store: Store) {}

  onSortChange(event: Event) {
    this.store.dispatch(
      new sneakersActions.FilterSort((event.target as HTMLInputElement).value)
    );
  }

  onNameChange(event: Event) {
    this.store.dispatch(
      new sneakersActions.FilterName((event.target as HTMLInputElement).value)
    );
  }
}
