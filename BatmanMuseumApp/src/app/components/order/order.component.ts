import { Component, OnInit, Inject } from '@angular/core';
import { TicketPurchasesService } from 'src/app/services/ticket-purchases.service';
import { TicketPurchases } from 'src/app/shared/ticket-purchases/ticket-purchases.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/user/user.module';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  minDate!: Date
  selectedDate!: Date;
  ticketId!: string;
  user!: User;

  constructor(private ticketPurchasesService: TicketPurchasesService,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: string, user: User },
    private toast: HotToastService) {}

ngOnInit(): void {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  this.minDate = now;
  this.ticketId = this.data.ticketId;
  this.user = this.data.user
}

  order() {
      const  ticketPurchase: TicketPurchases = {
        id: "new",
        date: this.selectedDate?.toISOString().slice(0, 10) as string,
        userId: this.user.id,
        ticketId: this.ticketId,
        billingName: this.user.fullname,
        billingAddress: this.user.address,
        billingPhoneNumber:this.user.phoneNumber
      }
      this.ticketPurchasesService.buyTicket(ticketPurchase).then( () => {
        this.toast.success("You have successfully purchased a ticket.")
      }).catch(err => {
        this.toast.error("The ticket purchase was not successful.")
      })
    }
}
