import { TestBed } from '@angular/core/testing';

import { TicketPurchasesService } from './ticket-purchases.service';

describe('TicketPurchasesService', () => {
  let service: TicketPurchasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketPurchasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
