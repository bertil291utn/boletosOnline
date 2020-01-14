import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaComponent } from './ruta.component';

describe('RutaComponent', () => {
  let component: RutaComponent;
  let fixture: ComponentFixture<RutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
