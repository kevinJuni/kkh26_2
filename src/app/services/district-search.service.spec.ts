import { TestBed, inject } from '@angular/core/testing';

import { DistrictSearchService } from './district-search.service';

describe('DistrictSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistrictSearchService]
    });
  });

  it('should be created', inject([DistrictSearchService], (service: DistrictSearchService) => {
    expect(service).toBeTruthy();
  }));
});
