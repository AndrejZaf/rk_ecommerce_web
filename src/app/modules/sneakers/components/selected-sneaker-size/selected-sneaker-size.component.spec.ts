import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSneakerSizeComponent } from './selected-sneaker-size.component';

describe('SelectedSneakerSizeComponent', () => {
  let component: SelectedSneakerSizeComponent;
  let fixture: ComponentFixture<SelectedSneakerSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSneakerSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedSneakerSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
