import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeCardComponent } from './day-time-card.component';

describe('DayTimeCardComponent', () => {
  let component: DayTimeCardComponent;
  let fixture: ComponentFixture<DayTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTimeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
