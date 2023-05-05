import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/shared/ticket/ticket.module';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent {
  constructor(private ticketService: TicketService, private toast: HotToastService) {}

  id: string = "" as string;
  name: string = "" as string;
  cost!: number
  description = "" as string;
  gifUrl = "" as string;

  create() {
    const data: Ticket = {
      id: "",
      name: this.name,
      cost: this.cost,
      description: this.description,
      gifUrl: this.gifUrl
    };

    this.ticketService.createTicket(data)

    this.toast.success("You have successfully created the ticket!")
  }
}
