import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDocumentComponent } from './teacher-document.component';

describe('TeacherDocumentComponent', () => {
  let component: TeacherDocumentComponent;
  let fixture: ComponentFixture<TeacherDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
