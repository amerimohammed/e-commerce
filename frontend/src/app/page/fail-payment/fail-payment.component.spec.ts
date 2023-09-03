import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailPaymentComponent } from './fail-payment.component';

describe('FailPaymentComponent', () => {
  let component: FailPaymentComponent;
  let fixture: ComponentFixture<FailPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailPaymentComponent]
    });
    fixture = TestBed.createComponent(FailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
