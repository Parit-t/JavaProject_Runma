import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInfo } from 'src/app/model/event-info';
import { Racetypedetail } from 'src/app/model/racetypedetail';
import { SalesService } from 'src/app/services/sales.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {
  events!: EventInfo;
  eventId: number = 0;
  contentLoaded: boolean=false;
  showRaceTitle: boolean=true;
  
  constructor(private salesService: SalesService,
    private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.salesService.getSalesEventInfo(this.eventId).subscribe(
      data => {
        this.events = data;
        this.contentLoaded = true;
 
        if (!this.events ) {
          this.contentLoaded = false;
        }
        if (this.events.raceTypeList.length == 0){
          this.showRaceTitle = false;
          
        }
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl("/event-view");
  }
  
}