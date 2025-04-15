import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeCollectionComponent } from './add-fee-collection.component';

describe('AddFeeCollectionComponent', () => {
  let component: AddFeeCollectionComponent;
  let fixture: ComponentFixture<AddFeeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeeCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
