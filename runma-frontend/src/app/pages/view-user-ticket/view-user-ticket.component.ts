import { Component, OnInit } from '@angular/core';
import { ViewTicket } from 'src/app/model/view-ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-user-ticket',
  templateUrl: './view-user-ticket.component.html',
  styleUrls: ['./view-user-ticket.component.css']
})
export class ViewUserTicketComponent implements OnInit {
  userId!:number;
  statusList: string[] = ['paid', 'unpaid', 'closed'];
  toggleStatus : Boolean[] = [true,true,false,false];

  ticketList: ViewTicket[] = [];
  ticketGroup: {[status: string]: ViewTicket[]} = {};

  constructor(private ticketService: TicketService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params[`id`];
    this.ticketService.getAllUserTicket(this.userId).subscribe(
      ticketList => {
      this.ticketList = ticketList;
        this.ticketGroup = this.ticketService.groupTicketByStatus(this.ticketList);
      }
    );
  }

  toggleAccordion(i:number){
    this.toggleStatus[i] = !this.toggleStatus[i];
  }
}
