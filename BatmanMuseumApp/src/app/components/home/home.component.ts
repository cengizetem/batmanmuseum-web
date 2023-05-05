import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { Ticket } from 'src/app/shared/ticket/ticket.module';
import { User } from 'src/app/shared/user/user.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  tickets: Ticket[] = []
  reviews: User[] = []
  
  constructor(private ticketService: TicketService, private userService: UserService) {}

  async ngOnInit() {
    this.getTickets()
    this.getAllReview()
  }

  getTickets() {
    this.ticketService.getAllTicket("name","desc").subscribe({
      next:(ticket: DocumentChangeAction<unknown>[]) =>  {
        this.tickets = ticket.map(g=>new Ticket({...g.payload.doc.data() as Ticket, id: g.payload.doc.id}));
      }
    })
  }

  getAllReview() {
    this.userService.getAllUser(4).subscribe({
      next:(user: DocumentChangeAction<unknown>[]) =>  {
        this.reviews = user.map(g=>new User({...g.payload.doc.data() as User, id: g.payload.doc.id}));
      }
    })
  }
}
