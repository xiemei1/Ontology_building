import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicVisComponent } from './topic-vis.component';

describe('TopicVisComponent', () => {
  let component: TopicVisComponent;
  let fixture: ComponentFixture<TopicVisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicVisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
