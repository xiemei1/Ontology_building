import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visualisation1Component } from './visualisation1.component';

describe('Visualisation1Component', () => {
  let component: Visualisation1Component;
  let fixture: ComponentFixture<Visualisation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Visualisation1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Visualisation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
