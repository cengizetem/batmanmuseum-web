import { OnInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/shared/ticket/ticket.module';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent  implements OnInit{

  constructor(private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket },
    private toast: HotToastService) {}

  ngOnInit(): void {
    this.id = this.data.ticket.id
    this.name = this.data.ticket.name
    this.cost = this.data.ticket.cost
    this.description = this.data.ticket.description
    this.gifUrl = this.data.ticket.gifUrl
  }
  id: string = "" as string;
  name: string = "" as string;
  cost!: number
  description = "" as string;
  gifUrl = "" as string;

  update() {
    const data: Ticket = {
      id: this.id,
      name: this.name,
      cost: this.cost,
      description: this.description,
      gifUrl: this.gifUrl
    };

    this.ticketService.updateTicket(data)
    this.toast.success("You have successfully updated the data!")
  }
}
