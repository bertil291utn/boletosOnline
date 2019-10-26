import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorComponent } from './conductor.component';

describe('ConductorComponent', () => {
  let component: ConductorComponent;
  let fixture: ComponentFixture<ConductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
