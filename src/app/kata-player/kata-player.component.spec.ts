import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataPlayerComponent } from './kata-player.component';

describe('KataPlayerComponent', () => {
  let component: KataPlayerComponent;
  let fixture: ComponentFixture<KataPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
