import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusInactivosComponent } from './bus-inactivos.component';

describe('BusInactivosComponent', () => {
  let component: BusInactivosComponent;
  let fixture: ComponentFixture<BusInactivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusInactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
