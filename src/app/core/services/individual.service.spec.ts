import { TestBed, inject } from '@angular/core/testing';

import { IndividualService } from './individual.service';

describe('IndividualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividualService]
    });
  });

  it('should ...', inject([IndividualService], (service: IndividualService) => {
    expect(service).toBeTruthy();
  }));
});
