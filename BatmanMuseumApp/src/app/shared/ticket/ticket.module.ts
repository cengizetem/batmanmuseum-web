export class Ticket { 
  id: string;
  name: string;
  cost: number;
  description: string;
  gifUrl: string;

  constructor(Ticket: Ticket) {
    this.id = Ticket.id;
    this.name = Ticket.name;
    this.cost = Ticket.cost;
    this.description = Ticket.description;
    this.gifUrl = Ticket.gifUrl;
  }
}
