import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveChallengeComponent } from './leave-challenge.component';

describe('LeaveChallengeComponent', () => {
  let component: LeaveChallengeComponent;
  let fixture: ComponentFixture<LeaveChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
