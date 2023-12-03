import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSneakerComponent } from './selected-sneaker.component';

describe('SelectedSneakerComponent', () => {
  let component: SelectedSneakerComponent;
  let fixture: ComponentFixture<SelectedSneakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSneakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedSneakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
