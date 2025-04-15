import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeInstallmentComponent } from './fee-installment.component';

describe('FeeInstallmentComponent', () => {
  let component: FeeInstallmentComponent;
  let fixture: ComponentFixture<FeeInstallmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeInstallmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
