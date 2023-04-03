import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInterface } from 'src/app/model/eventInterface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit{
  constructor(
    private eventService: EventService, 
    private modalService: NgbModal,private route: ActivatedRoute, 
    private router: Router
    ) {}
    public events: any;
    public objectEvent: any;
    ngOnInit(){
      // for Admin
      this.getAllEvents();

      // for Organizer
      //this.getOrgEvents(id);

    }
      //function to get all Events
  public getAllEvents(): void {
    this.eventService.getAllEvent().subscribe(
      (Response:EventInterface[]) =>{
        this.events = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getOrgEvents(id:number): void {
    this.eventService.getOrgEvent(id).subscribe(
      (Response:EventInterface[]) =>{
        this.events = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDetails(targetModal: any, event: any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.objectEvent = event;
    
 }

 toEdit(id: number) {
  this.router.navigateByUrl(`/event-edit/${id}`);
}

toSale(id: number) {
  this.router.navigateByUrl(`/salesreport/${id}`);
}

}
