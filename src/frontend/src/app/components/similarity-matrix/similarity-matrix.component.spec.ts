import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityMatrixComponent } from './similarity-matrix.component';

describe('SimilarityMatrixComponent', () => {
  let component: SimilarityMatrixComponent;
  let fixture: ComponentFixture<SimilarityMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarityMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
