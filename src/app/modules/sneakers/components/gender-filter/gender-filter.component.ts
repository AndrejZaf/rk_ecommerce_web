import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as sneakersActions from '../../store/sneaker.actions';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
})
export class GenderFilterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      male: this.fb.control(false),
      female: this.fb.control(false),
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val) => {
      const selectedGenders = [];
      if (val.male) {
        selectedGenders.push('MALE');
      }

      if (val.female) {
        selectedGenders.push('FEMALE');
      }
      this.store.dispatch(new sneakersActions.SelectGenders(selectedGenders));
    });
  }
}
