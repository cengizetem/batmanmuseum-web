import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Ticket } from '../shared/ticket/ticket.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private afs: AngularFirestore) { }

  //create
  createTicket(ticket: Ticket) {
    ticket.id = this.afs.createId();
    return this.afs.collection<Ticket>("Tickets").doc(ticket.id).set(ticket);
  }

  //update
  updateTicket(ticket: Ticket) {
    return this.afs.collection<Ticket>("Tickets").doc(ticket.id).update(ticket);
  }

  //delete
  deleteTicket(ticketid: string) {
    return this.afs.collection<Ticket>("Tickets").doc(ticketid).delete();
  }


  //read
  getAllTicket(order: string, direction: "asc" | "desc"):   Observable<DocumentChangeAction<unknown>[]>{
    return this.afs.collection('Tickets', ref => ref.orderBy(order, direction).limit(63)).snapshotChanges();
  }

  async getTicket(ticketid: string): Promise<Ticket> {
    const snapshot =  await this.afs.collection<Ticket>("Tickets").doc(ticketid).ref.get();
    const data = snapshot.data();
    if (!data) {
      throw new Error(``);
    }
    const ticket: Ticket = {
      id: data.id,
      name: data.name,
      description: data.description,
      cost: data.cost,
      gifUrl: data.gifUrl
    };
    return ticket;
  }
}
