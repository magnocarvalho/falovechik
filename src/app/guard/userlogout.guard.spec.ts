import { TestBed, async, inject } from '@angular/core/testing';

import { UserlogoutGuard } from './userlogout.guard';

describe('UserlogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserlogoutGuard]
    });
  });

  it('should ...', inject([UserlogoutGuard], (guard: UserlogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
