import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStudenImageComponent } from './add-update-studen-image.component';

describe('AddUpdateStudenImageComponent', () => {
  let component: AddUpdateStudenImageComponent;
  let fixture: ComponentFixture<AddUpdateStudenImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateStudenImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateStudenImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
