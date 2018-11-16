import { TestBed, inject } from '@angular/core/testing';

import { PartnerService } from './partners.service';

describe('PartnersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerService]
    });
  });

  it('should be created', inject([PartnerService], (service: PartnerService) => {
    expect(service).toBeTruthy();
  }));
});
