import { TestBed } from '@angular/core/testing';

import { ApacheService } from './apache.service';

describe('ApacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApacheService = TestBed.get(ApacheService);
    expect(service).toBeTruthy();
  });
});
