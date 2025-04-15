import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasImageComponent } from './canvas-image.component';

describe('CanvasImageComponent', () => {
  let component: CanvasImageComponent;
  let fixture: ComponentFixture<CanvasImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
