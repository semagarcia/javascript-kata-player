import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentChallengeListComponent } from './current-challenge-list.component';

describe('CurrentChallengeListComponent', () => {
  let component: CurrentChallengeListComponent;
  let fixture: ComponentFixture<CurrentChallengeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentChallengeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentChallengeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
