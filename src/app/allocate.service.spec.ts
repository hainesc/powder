import { TestBed, inject } from '@angular/core/testing';

import { AllocateService } from './allocate.service';

describe('AllocateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocateService]
    });
  });

  it('should be created', inject([AllocateService], (service: AllocateService) => {
    expect(service).toBeTruthy();
  }));
});
