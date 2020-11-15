import { TestBed } from '@angular/core/testing';

import { OrderGuard } from './order.guard';

describe('OrderGuard', () => {
  let guard: OrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
