import { TestBed } from '@angular/core/testing';

import { MstlovService } from './mstlov.service';

describe('MstlovService', () => {
  let service: MstlovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstlovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
