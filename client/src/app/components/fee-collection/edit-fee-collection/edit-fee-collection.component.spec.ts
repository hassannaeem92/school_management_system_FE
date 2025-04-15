import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeeCollectionComponent } from './edit-fee-collection.component';

describe('EditFeeCollectionComponent', () => {
  let component: EditFeeCollectionComponent;
  let fixture: ComponentFixture<EditFeeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeeCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFeeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
