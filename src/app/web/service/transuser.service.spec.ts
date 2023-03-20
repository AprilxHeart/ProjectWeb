import { TestBed } from '@angular/core/testing';

import { TransuserService } from './transuser.service';

describe('TransuserService', () => {
  let service: TransuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
