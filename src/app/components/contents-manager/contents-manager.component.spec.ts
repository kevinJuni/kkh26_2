import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsManagerComponent } from './contents-manager.component';

describe('ContentsManagerComponent', () => {
  let component: ContentsManagerComponent;
  let fixture: ComponentFixture<ContentsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
