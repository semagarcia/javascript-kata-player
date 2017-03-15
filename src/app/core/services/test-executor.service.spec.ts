import { TestBed, inject } from '@angular/core/testing';

import { TestExecutorService } from './test-executor.service';

describe('TestExecutorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestExecutorService]
    });
  });

  it('should ...', inject([TestExecutorService], (service: TestExecutorService) => {
    expect(service).toBeTruthy();
  }));
});
