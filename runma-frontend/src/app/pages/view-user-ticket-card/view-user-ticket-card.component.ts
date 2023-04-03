import { Component, OnInit ,Input} from '@angular/core';

import { ViewTicket } from 'src/app/model/view-ticket';

@Component({
  selector: 'view-user-ticket-card',
  templateUrl: './view-user-ticket-card.component.html',
  styleUrls: ['./view-user-ticket-card.component.css']
})
export class ViewUserTicketCardComponent implements OnInit {
  
  @Input() ticket!: ViewTicket;
  constructor() { }
  
  ngOnInit(): void {
  }

}
