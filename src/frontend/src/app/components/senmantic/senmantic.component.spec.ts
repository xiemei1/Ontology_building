import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenmanticComponent } from './senmantic.component';

describe('SenmanticComponent', () => {
  let component: SenmanticComponent;
  let fixture: ComponentFixture<SenmanticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenmanticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenmanticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
