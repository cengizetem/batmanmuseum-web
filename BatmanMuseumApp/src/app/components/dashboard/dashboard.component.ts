import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { TicketPurchasesService } from 'src/app/services/ticket-purchases.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { TicketPurchases } from 'src/app/shared/ticket-purchases/ticket-purchases.module';
import { Ticket } from 'src/app/shared/ticket/ticket.module';
import { User } from 'src/app/shared/user/user.module';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  user: User = {} as User
  mytickets:  any[] = [];

  constructor(
    private userService: UserService, 
    private auth: AuthService,
    private ticketService: TicketService,
    private ticketpurchasesService: TicketPurchasesService
    ) {}

  async ngOnInit() {
    this.user = await this.userService.getUserById(await this.auth.getUid());
    await this.myticketsMethod()
  }

  async myticketsMethod() {
    this.ticketpurchasesService.getTicket(this.user.id, "date", "asc").subscribe({
      next: async (ticketPurchases: DocumentChangeAction<TicketPurchases>[]) => {
        for (const i of ticketPurchases) {
          const ticket: Ticket = await this.getTicketData(i.payload.doc.data().ticketId);
          const data: any = {
            id: i.payload.doc.data().id,
            name: ticket.name,
            date: i.payload.doc.data().date,
            billingName: i.payload.doc.data().billingName,
            billingAddress: i.payload.doc.data().billingAddress,
            billingPhoneNumber: i.payload.doc.data().billingPhoneNumber,
            gifUrl: ticket.gifUrl
          };
          this.mytickets.push(data)
        }
      }
    });
  }
  async getTicketData(ticketid: string): Promise<Ticket> {
    const ticket = await this.ticketService.getTicket(ticketid);
    return ticket;
  }
  
  download(id: string,name: string,date: string,
    billingName: string,billingAddress: string,
    billingPhoneNumber: string) {

    const pdfDocDefinition = {
      content: [
        { text: 'id: ' + id + "\nTicket name: " + name +
        "\nDate: " + date + "\n Billing Name: " + billingName + 
        "\nBilling Address: " + billingAddress + "\nBilling Phone: " + billingPhoneNumber
        , fontSize: 16 }
      ],
      defaultStyle: {
        font: 'Roboto'
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(pdfDocDefinition);
    pdfDocGenerator.download('ticket-'+ id + '.pdf');
  }
  
  
}
