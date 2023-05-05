import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { TicketPurchases } from '../shared/ticket-purchases/ticket-purchases.module';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketPurchasesService {

  constructor(private afs: AngularFirestore) { }

  //create
  buyTicket(TicketPurchases: TicketPurchases) {
    TicketPurchases.id = this.afs.createId();
    return this.afs.collection<TicketPurchases>("TicketPurchases").doc(TicketPurchases.id).set(TicketPurchases);
  }

  //Read
  getTicket(userid= "None", order: string, direction: "asc" | "desc" ): Observable<DocumentChangeAction<TicketPurchases>[]> {
    if (userid === "None") {
      return this.afs.collection<TicketPurchases>('TicketPurchases', ref => ref.orderBy(order,direction).limit(63)).snapshotChanges();
    } else {
      return this.afs.collection<TicketPurchases>('TicketPurchases', ref => ref.where("userId", "==" , userid).orderBy(order,direction).limit(63)).snapshotChanges();
    }
  }

}

