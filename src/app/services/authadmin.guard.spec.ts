import { TestBed, async, inject } from '@angular/core/testing';

import { AuthadminGuard } from './authadmin.guard';

describe('AuthadminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthadminGuard]
    });
  });

  it('should ...', inject([AuthadminGuard], (guard: AuthadminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
