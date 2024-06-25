import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerFilterComponent } from './sneaker-filter.component';

describe('SneakerFilterComponent', () => {
  let component: SneakerFilterComponent;
  let fixture: ComponentFixture<SneakerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SneakerFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
