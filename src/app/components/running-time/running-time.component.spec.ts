import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTimeComponent } from './running-time.component';

describe('RunningTimeComponent', () => {
  let component: RunningTimeComponent;
  let fixture: ComponentFixture<RunningTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
