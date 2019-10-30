import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondInactivosComponent } from './cond-inactivos.component';

describe('CondInactivosComponent', () => {
  let component: CondInactivosComponent;
  let fixture: ComponentFixture<CondInactivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondInactivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
