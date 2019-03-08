import { TestBed, async, inject } from '@angular/core/testing';

import { UserlogadoGuard } from './userlogado.guard';

describe('UserlogadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserlogadoGuard]
    });
  });

  it('should ...', inject([UserlogadoGuard], (guard: UserlogadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
