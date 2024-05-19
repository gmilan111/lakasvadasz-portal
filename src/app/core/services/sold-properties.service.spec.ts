import { TestBed } from '@angular/core/testing';

import { SoldPropertiesService } from './sold-properties.service';

describe('SoldPropertiesService', () => {
  let service: SoldPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
