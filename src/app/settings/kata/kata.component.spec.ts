import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataComponent } from './kata.component';

describe('KataComponent', () => {
  let component: KataComponent;
  let fixture: ComponentFixture<KataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
