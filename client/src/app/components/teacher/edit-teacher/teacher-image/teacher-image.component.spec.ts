import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherImageComponent } from './teacher-image.component';

describe('TeacherImageComponent', () => {
  let component: TeacherImageComponent;
  let fixture: ComponentFixture<TeacherImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
