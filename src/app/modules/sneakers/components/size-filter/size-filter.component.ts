import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss'],
})
export class SizeFilterComponent {
  @Input() sizes: number[] | null = [];
  selectedSizes: number[] = [];

  selectNewSize(size: number) {
    if (this.selectedSizes.indexOf(size) === -1) {
      this.selectedSizes.push(size);
    } else {
      const index = this.selectedSizes.indexOf(size);
      this.selectedSizes.splice(index, 1);
    }
  }
}
