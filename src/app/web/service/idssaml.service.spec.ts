import { TestBed } from '@angular/core/testing';

import { IdssamlService } from './idssaml.service';

describe('IdssamlService', () => {
  let service: IdssamlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdssamlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
