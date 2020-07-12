import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTimeCardComponent } from './week-time-card.component';

describe('WeekTimeCardComponent', () => {
  let component: WeekTimeCardComponent;
  let fixture: ComponentFixture<WeekTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekTimeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
