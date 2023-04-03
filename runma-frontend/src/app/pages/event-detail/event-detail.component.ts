import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RunEvent } from 'src/app/model/run-event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent {
  eventId!: number;
  event$: Observable<RunEvent> | null = null;
  mySubscription!: Subscription;
  errorMessage: Boolean = false;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.event$ = this.eventService.getEventById$(this.eventId);
    this.event$.subscribe((data) => {
      if (!data) {
        setTimeout(() => {
          // this.router.navigateByUrl(`edit-user/${this.eventId}`);
        }, 5000);
      }
    });
  }
}
