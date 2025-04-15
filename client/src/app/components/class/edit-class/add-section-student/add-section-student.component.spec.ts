import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionStudentComponent } from './add-section-student.component';

describe('AddSectionStudentComponent', () => {
  let component: AddSectionStudentComponent;
  let fixture: ComponentFixture<AddSectionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSectionStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSectionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
