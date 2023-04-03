import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../model/editEvent';
import { Organizer } from '../../model/editEventOrganizer'
import { RaceType } from '../../model/editEventRaceType'
import { EditEventService } from 'src/app/services/edit-event.service';
import { race } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit{

  existOrganizer: Organizer[] = [Organizer.defaultOrganizer()];
  oldEvent: Event = Event.defaultEvent();
  eventId: number;
  eventForm: FormGroup;
  
    constructor(
      private route: ActivatedRoute,
      private eventService: EditEventService,
      private fb: FormBuilder,
      private snackbar:MatSnackBar,
      private router: Router
    ) { 
      this.eventId=0
      this.eventForm = this.fb.group({
        id: new FormControl(),
        name: ['', Validators.required],
        raceDate: ['', Validators.required],
        openRegisDate: ['', Validators.required],
        closeRegisDate: ['', Validators.required],
        outOfTicketFlag: ['', Validators.required],
        province: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z\s]+$')])],
        location: ['', Validators.required],
        capacity: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9\s]+$')])],
        raceTypeList: this.fb.array([]),
        organizerList: new FormArray([])
      });
    }

    ngOnInit(): void {
      this.eventId = this.route.snapshot.params['id'];
      this.getOrganizer();
      this.getEventByIdtoForm();
    }

    get raceTypeListForm() {
      return this.eventForm.get('raceTypeList') as FormArray;
    }
    
    addRaceTypeListControl(): void{
      const rt = this.fb.group({
          id: new FormControl(),
          price: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9\s]+$')])],
          name: ['', Validators.required],
          distance: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9\s]+$')])]
      })
      this.raceTypeListForm.push(rt);
    }
    
    deleteRaceTypeListControl(index: number) {
      this.raceTypeListForm.removeAt(index);
    }
    
    clearRaceTypeListControl(): void{
      this.raceTypeListForm.clear();
    }
    
    get organizerListForm() {
      return this.eventForm.get('organizerList') as FormArray;
    }
    
    addOrganizerListControl(): void{
      const org = this.fb.group({
        id: ['', Validators.required],
        name: new FormControl(),
        contact: new FormControl(),
        website: new FormControl(),
        facebook: new FormControl(),
        email: new FormControl()
        })
      this.organizerListForm.push(org);
    }
  
    deleteOrganizerListControl(index: number) {
      this.organizerListForm.removeAt(index);
    }
  
   clearOrganizerListControl(): void{
    this.organizerListForm.clear();
   }
  
    //pre-load Organizer
    getOrganizer(): void {
        this.eventService.getOrganizer().subscribe(
          (response: Organizer[]) => {
            this.existOrganizer = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
    }
  
    // load Event from eventView page
    getEventByIdtoForm(): void {
      this.eventService.getEventById(this.route.snapshot.params['id']).subscribe(
        (res)=> {
          this.oldEvent = res;
          this.eventForm.patchValue({
            id: this.oldEvent.id,
            name: this.oldEvent.name,
            raceDate: this.oldEvent.raceDate,
            openRegisDate: this.oldEvent.openRegisDate,
            closeRegisDate: this.oldEvent.closeRegisDate,
            outOfTicketFlag: this.oldEvent.outOfTicketFlag,
            province: this.oldEvent.province,
            location: this.oldEvent.location,
            capacity: this.oldEvent.capacity,
            raceTypeList: this.oldEvent.raceTypeList,
            organizerList: this.oldEvent.organizerList,
          });
          for (let i = 0; i<this.oldEvent.raceTypeList.length;i++) {
            let rt = this.fb.group({
              id: [this.oldEvent.raceTypeList[i].id],
              name: [this.oldEvent.raceTypeList[i].name, Validators.required],
              distance: [this.oldEvent.raceTypeList[i].distance, Validators.compose([Validators.required,Validators.pattern('^[0-9\s]+$')])],
              price: [this.oldEvent.raceTypeList[i].price, Validators.compose([Validators.required,Validators.pattern('^[0-9\s]+$')])],
              })
          this.raceTypeListForm.push(rt)
          };
          for (let i = 0; i<this.oldEvent.organizerList.length;i++) {
            let org = this.fb.group({
              id: [this.oldEvent.organizerList[i].id],
              name: [this.oldEvent.organizerList[i].name, Validators.required],
              contact: [this.oldEvent.organizerList[i].contact],
              website: [this.oldEvent.organizerList[i].website],
              facebook: [this.oldEvent.organizerList[i].facebook],
              email: [this.oldEvent.organizerList[i].email]
              })
          this.organizerListForm.push(org)
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    onOrgChange(changeOrg: any,i: number) {
      let id = changeOrg.target.value;
      this.eventService.getOrganizerById(id).subscribe(
        (response: Organizer) => {
          this.organizerListForm.controls[i].patchValue({
            id: response.id,
            contact: response.contact,
            website: response.website,
            facebook: response.facebook,
            email: response.email
          })
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  
    onSubmit(){
      this.eventForm.controls['id'].setValue(this.oldEvent.id)
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(()=> {
        this.snackbar.open('Updated Succesfully','ok')
      }, (err: any) => {
        console.log(err);
        this.snackbar.open('Update Fail','ok')
      })
    }

    onCancel() {
      this.router.navigateByUrl("/event-view");
    }
}
