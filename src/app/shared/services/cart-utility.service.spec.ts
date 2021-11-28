import { TestBed } from '@angular/core/testing';

import { CartUtilityService } from './cart-utility.service';

describe('CartUtilityService', () => {
  let service: CartUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
