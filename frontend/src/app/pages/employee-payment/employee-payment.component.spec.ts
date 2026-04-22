import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePaymentComponent } from './employee-payment.component';

describe('EmployeePaymentComponent', () => {
  let component: EmployeePaymentComponent;
  let fixture: ComponentFixture<EmployeePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
