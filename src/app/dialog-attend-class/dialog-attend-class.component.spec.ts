import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAttendClassComponent } from './dialog-attend-class.component';

describe('DialogAttendClassComponent', () => {
  let component: DialogAttendClassComponent;
  let fixture: ComponentFixture<DialogAttendClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAttendClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttendClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
