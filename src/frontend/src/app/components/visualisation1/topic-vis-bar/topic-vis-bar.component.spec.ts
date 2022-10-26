import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicVisBarComponent } from './topic-vis-bar.component';

describe('TopicVisBarComponent', () => {
  let component: TopicVisBarComponent;
  let fixture: ComponentFixture<TopicVisBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicVisBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicVisBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
