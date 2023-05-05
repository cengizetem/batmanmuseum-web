import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/shared/ticket/ticket.module';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'src/app/services/ticket.service';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { UpdateTicketComponent } from '../update-ticket/update-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  tickets: Ticket[] = []
  displayedColumns: string[] = ['name', 'cost', 'description', 'gifUrl', 'setting'];

  constructor(private ticketService: TicketService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getAllTicket("name","desc").subscribe({
      next:(ticket: DocumentChangeAction<unknown>[]) =>  {
        this.tickets =  ticket.map(g=>new Ticket({...g.payload.doc.data() as Ticket, id: g.payload.doc.id}));
      }
    })
  }

  updateTicket(ticket: Ticket): void {
    const dialogRef = this.dialog.open(UpdateTicketComponent, {
        width: '300px',
        data: { 
          ticket: ticket
        }
    });
  }

  deleteTicket(ticket: Ticket): void {
    if(confirm("Are you sure you want to delete this ticket?")) {
      this.ticketService.deleteTicket(ticket.id)
    } 
  }

  createTicket() {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      width: '300px'
  });
  }
}