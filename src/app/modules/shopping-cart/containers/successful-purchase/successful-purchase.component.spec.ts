import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfulPurchaseComponent } from './successful-purchase.component';

describe('SuccesfulPurchaseComponent', () => {
  let component: SuccesfulPurchaseComponent;
  let fixture: ComponentFixture<SuccesfulPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesfulPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesfulPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
