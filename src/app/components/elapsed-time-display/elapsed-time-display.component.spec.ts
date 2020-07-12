import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElapsedTimeDisplayComponent } from './elapsed-time-display.component';

describe('ElapsedTimeDisplayComponent', () => {
  let component: ElapsedTimeDisplayComponent;
  let fixture: ComponentFixture<ElapsedTimeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElapsedTimeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElapsedTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
