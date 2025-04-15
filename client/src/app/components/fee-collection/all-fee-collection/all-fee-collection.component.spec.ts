import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeeCollectionComponent } from './all-fee-collection.component';

describe('AllFeeCollectionComponent', () => {
  let component: AllFeeCollectionComponent;
  let fixture: ComponentFixture<AllFeeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFeeCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
