import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativaComponent } from './cooperativa.component';

describe('CooperativaComponent', () => {
  let component: CooperativaComponent;
  let fixture: ComponentFixture<CooperativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
