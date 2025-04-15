import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateParentComponent } from './add-update-parent.component';

describe('AddUpdateParentComponent', () => {
  let component: AddUpdateParentComponent;
  let fixture: ComponentFixture<AddUpdateParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
