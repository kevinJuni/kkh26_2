import { TestBed, inject } from '@angular/core/testing';

import { ManagerService } from './manager.service';

describe('MamagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerService]
    });
  });

  it('should be created', inject([ManagerService], (service: ManagerService) => {
    expect(service).toBeTruthy();
  }));
});
