import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as sneakersActions from '../../store/sneaker.actions';
@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss'],
})
export class SizeFilterComponent {
  @Input() sizes: number[] | null;
  selectedSizes: number[] = [];

  constructor(private store: Store) {}

  selectNewSize(size: number) {
    if (this.selectedSizes.indexOf(size) === -1) {
      this.selectedSizes.push(size);
    } else {
      const index = this.selectedSizes.indexOf(size);
      this.selectedSizes.splice(index, 1);
    }
    this.store.dispatch(new sneakersActions.SelectSizes(this.selectedSizes));
  }
}
