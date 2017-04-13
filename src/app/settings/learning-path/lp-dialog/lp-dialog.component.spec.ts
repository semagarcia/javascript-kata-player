import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpDialogComponent } from './lp-dialog.component';

describe('LpDialogComponent', () => {
  let component: LpDialogComponent;
  let fixture: ComponentFixture<LpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
