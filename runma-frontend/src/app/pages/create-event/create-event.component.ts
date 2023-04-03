import { EventService } from '../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Event } from '../../model/event';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm : FormGroup;
  orgID: number;
  event: Event = new Event();
  errorMessage: string;
  errorStatus: string;

  constructor(private fb: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private snackbar:MatSnackBar) {
    this.orgID = 0;
    this.errorMessage = ''
    this.errorStatus = ''
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      raceDate: ['', Validators.required],
      openRegisDate: ['', Validators.required],
      closeRegisDate: ['', Validators.required],
      province: ['', Validators.required],
      capacity: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.orgID = this.route.snapshot.params[`id`];
    console.log(this.orgID)
  }

  onSubmitEvent() {
    this.event = this.eventForm.value;
    this.event.outOfTicketFlag = false;
    console.log(this.event)
    this.eventService.createEvent(this.event, this.orgID).subscribe(data=>{
      console.log(data);
      this.snackbar.open('Created event successfully', 'ok')
    }, err => {console.log(err);
    const error = err.error;
      this.errorMessage = error.message;
      this.snackbar.open(this.errorMessage, 'ok')
      console.log("errormessage" + this.errorMessage)}
    );
  }

  checkDate() {
    const open = this.eventForm.get('openRegisDate')
    console.log(open)
  }

}
