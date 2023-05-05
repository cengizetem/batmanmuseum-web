export class TicketPurchases { 
  id: string;
  date: string;
  userId: string;
  ticketId: string;
  billingName: string;
  billingAddress: string;
  billingPhoneNumber: string;

  constructor(TicketPurchasesModule: TicketPurchases) {
    this.id = TicketPurchasesModule.id;
    this.date = TicketPurchasesModule.date;
    this.userId = TicketPurchasesModule.userId;
    this.ticketId = TicketPurchasesModule.ticketId;
    this.billingName = TicketPurchasesModule.billingName;
    this.billingAddress = TicketPurchasesModule.billingAddress;
    this.billingPhoneNumber = TicketPurchasesModule.billingPhoneNumber;
  }
}
