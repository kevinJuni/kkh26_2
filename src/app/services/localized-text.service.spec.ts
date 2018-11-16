import { TestBed, inject } from '@angular/core/testing';

import { LocalizedTextService } from './localized-text.service';

describe('LocalizedTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedTextService]
    });
  });

  it('should be created', inject([LocalizedTextService], (service: LocalizedTextService) => {
    expect(service).toBeTruthy();
  }));
});
