import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBolComponent } from './venta-bol.component';

describe('VentaBolComponent', () => {
  let component: VentaBolComponent;
  let fixture: ComponentFixture<VentaBolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaBolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaBolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
