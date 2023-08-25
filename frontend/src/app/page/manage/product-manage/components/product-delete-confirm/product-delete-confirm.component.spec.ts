import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteConfirmComponent } from './product-delete-confirm.component';

describe('ProductDeleteConfirmComponent', () => {
  let component: ProductDeleteConfirmComponent;
  let fixture: ComponentFixture<ProductDeleteConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDeleteConfirmComponent]
    });
    fixture = TestBed.createComponent(ProductDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
