import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeRemoveConfirmComponent } from './notice-remove-confirm.component';

describe('NoticeRemoveConfirmComponent', () => {
  let component: NoticeRemoveConfirmComponent;
  let fixture: ComponentFixture<NoticeRemoveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeRemoveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeRemoveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
