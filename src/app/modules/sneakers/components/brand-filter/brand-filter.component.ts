import { Component, Input, OnInit } from '@angular/core';
import { BrandDTO } from '../../dtos/brand.dto';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as sneakersActions from '../../store/sneaker.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent implements OnInit {
  @Input() brands: BrandDTO[] | null;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.form = this.formBuilder.group({
      brands: new FormArray([]),
    });
  }
  ngOnInit(): void {
    this.brands?.map((_) =>
      this.brandCheckboxes.push(this.formBuilder.control(false))
    );
    this.brandCheckboxes.valueChanges.subscribe((values) => {
      const checkedBrands: number[] = [];
      this.brands?.map((brand, index) => {
        if (values[index]) {
          checkedBrands.push(brand.id);
        }
      });
      this.store.dispatch(new sneakersActions.SelectBrandsIds(checkedBrands));
    });
  }

  get brandCheckboxes() {
    return this.form.controls['brands'] as FormArray;
  }
}
