import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarySelectComponent } from './binary-select.component';

describe('BinarySelectComponent', () => {
  let component: BinarySelectComponent;
  let fixture: ComponentFixture<BinarySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinarySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinarySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
