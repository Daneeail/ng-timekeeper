import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTimeCardComponent } from './month-time-card.component';

describe('MonthTimeCardComponent', () => {
  let component: MonthTimeCardComponent;
  let fixture: ComponentFixture<MonthTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthTimeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
