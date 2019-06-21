import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqRemoveConfirmComponent } from './faq-remove-confirm.component';

describe('FaqRemoveConfirmComponent', () => {
  let component: FaqRemoveConfirmComponent;
  let fixture: ComponentFixture<FaqRemoveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqRemoveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqRemoveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
