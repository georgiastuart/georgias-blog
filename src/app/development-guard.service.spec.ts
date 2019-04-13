import { TestBed } from '@angular/core/testing';

import { DevelopmentGuardService } from './development-guard.service';

describe('DevelopmentGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevelopmentGuardService = TestBed.get(DevelopmentGuardService);
    expect(service).toBeTruthy();
  });
});
