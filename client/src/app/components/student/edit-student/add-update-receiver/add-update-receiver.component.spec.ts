import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReceiverComponent } from './add-update-receiver.component';

describe('AddUpdateReceiverComponent', () => {
  let component: AddUpdateReceiverComponent;
  let fixture: ComponentFixture<AddUpdateReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateReceiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
