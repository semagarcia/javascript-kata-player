import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefresherButtonComponent } from './refresher-button.component';

describe('RefresherButtonComponent', () => {
  let component: RefresherButtonComponent;
  let fixture: ComponentFixture<RefresherButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefresherButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefresherButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
