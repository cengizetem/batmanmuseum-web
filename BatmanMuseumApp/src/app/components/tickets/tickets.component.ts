import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user/user.module';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/shared/ticket/ticket.module';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  user: User = {} as User
  tickets: Ticket[] = []

  constructor(
    private userService: UserService, 
    private auth: AuthService,
    private toast: HotToastService,
    private router: Router,
    private ticketService: TicketService,
    public dialog: MatDialog) {}

  async ngOnInit() {
    this.user = await this.userService.getUserById(await this.auth.getUid());
    this.getTickets()
  }

  getTickets() {
    this.ticketService.getAllTicket("name","desc").subscribe({
      next:(ticket: DocumentChangeAction<unknown>[]) =>  {
        this.tickets = ticket.map(g=>new Ticket({...g.payload.doc.data() as Ticket, id: g.payload.doc.id}));
      }
    })
  }

  OrderDialog(ticketId: string): void {
    const dialogRef = this.dialog.open(OrderComponent, {
        width: '300px',
        data: { 
          ticketId: ticketId,
          user: this.user}
    });
}


  buyTicket(ticketid: string) {
    if (this.user.address.length == 0 || this.user.fullname.length === 0 || this.user.phoneNumber.length == 0) {
      this.toast.error("Your address, phone number or full name is either empty or missing.")
    } else {
      this.OrderDialog(ticketid);
    }
  }
}