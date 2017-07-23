import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KataEditorComponent } from './kata-editor.component';

describe('KataEditorComponent', () => {
  let component: KataEditorComponent;
  let fixture: ComponentFixture<KataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
