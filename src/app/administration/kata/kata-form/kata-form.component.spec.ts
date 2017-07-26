import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataFormComponent } from './kata-form.component';

describe('KataFormComponent', () => {
  let component: KataFormComponent;
  let fixture: ComponentFixture<KataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
