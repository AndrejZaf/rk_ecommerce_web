import { TestBed } from '@angular/core/testing';

import { SneakerSizeService } from './sneaker-size.service';

describe('SneakerSizeService', () => {
  let service: SneakerSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SneakerSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
