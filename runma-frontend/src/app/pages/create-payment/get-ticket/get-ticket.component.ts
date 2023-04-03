import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketResponse } from 'src/app/model/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css'],
})
export class GetTicketComponent {
  ticketId!: number;
  theTicket: TicketResponse | null = null;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.params['id']);
    this.showTicket();
  }

  showTicket(): void {
    this.paymentService.getTicket(this.ticketId).subscribe(
      (data: TicketResponse) => {
        this.theTicket = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
}
