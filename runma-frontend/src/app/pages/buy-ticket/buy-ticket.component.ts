import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RunEvent } from 'src/app/model/run-event';
import { Observable, Subscription } from 'rxjs';
import { TicketRequest } from 'src/app/model/ticket-request';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
})
export class BuyTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  eventId!: number;
  eventData$!: Observable<RunEvent>;
  req!: TicketRequest;
  subscription!: Subscription;
  //DUMMY
  userId = {
    userid: 1,
  };
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.eventData$ = this.eventService.getEventById$(this.eventId);
    this.eventData$.subscribe((data) => {
      if (!data) {
        setTimeout(() => {
          // this.router.navigateByUrl(`edit-user/${this.eventId}`);
        }, 5000);
      }
    });
    this.ticketForm = this.fb.group({
      shirtSize: ['M'],
      raceTypeId: [0],
    });
    // setTimeout(() => {
    //   console.log('Timeout work');
    //   if (this.eventData$) {
    //     console.log('event is null');
    //     this.router.navigateByUrl(`edit-user/${this.eventId}`);
    //   }
    // }, 5000);
  }

  createTicket() {
    console.log('CREATE INITIAL');
    this.req = {
      userId: this.userId.userid,
      raceTypeId: Number(this.ticketForm.value.raceTypeId),
      shirtSize: this.ticketForm.value.shirtSize,
      createDate: new Date(),
    };
    this.ticketService.create(this.req);
  }

  goBack() {
    this.eventData$.subscribe((eventData) => {
      this.router.navigateByUrl(`event-detail/${eventData!.id}`);
    });
  }
}
