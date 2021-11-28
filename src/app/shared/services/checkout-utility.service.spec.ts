import { TestBed } from '@angular/core/testing';

import { CheckoutUtilityService } from './checkout-utility.service';

describe('CheckoutUtilityService', () => {
  let service: CheckoutUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
