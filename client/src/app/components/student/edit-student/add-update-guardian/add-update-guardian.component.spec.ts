import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateGuardianComponent } from './add-update-guardian.component';

describe('AddUpdateGuardianComponent', () => {
  let component: AddUpdateGuardianComponent;
  let fixture: ComponentFixture<AddUpdateGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateGuardianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
