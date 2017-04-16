import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataDialogComponent } from './kata-dialog.component';

describe('KataDialogComponent', () => {
  let component: KataDialogComponent;
  let fixture: ComponentFixture<KataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
