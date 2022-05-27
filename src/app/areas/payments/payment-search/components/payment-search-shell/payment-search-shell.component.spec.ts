import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentSearchShellComponent } from './payment-search-shell.component';

describe('PaymentSearchShellComponent', () => {
  let component: PaymentSearchShellComponent;
  let fixture: ComponentFixture<PaymentSearchShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentSearchShellComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSearchShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
