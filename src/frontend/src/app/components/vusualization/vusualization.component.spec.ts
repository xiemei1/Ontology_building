import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VusualizationComponent } from './vusualization.component';

describe('VusualizationComponent', () => {
  let component: VusualizationComponent;
  let fixture: ComponentFixture<VusualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VusualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VusualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
