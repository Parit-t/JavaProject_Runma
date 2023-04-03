import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RacetypeService } from 'src/app/services/racetype.service';
import { RacetypeRspon } from 'src/app/model/racetype';

@Component({
  selector: 'app-create-racetype',
  templateUrl: './create-racetype.component.html',
  styleUrls: ['./create-racetype.component.css'],
})
export class CreateRacetypeComponent implements OnInit {
  eventId!: number;
  theRaceType: RacetypeRspon[] = [];
  raceTypeForm!: FormGroup;

  constructor(
    private raceTypeService: RacetypeService,
    private activeatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private raceType: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.activeatedRoute.snapshot.params['id']); // cast eventId to a number
    this.showRaceType();
    this.createForm();
  }

  showRaceType() {
    this.raceTypeService
      .searchByEventId(this.eventId)
      .subscribe((data: RacetypeRspon[]) => {
        this.ngZone.run(() => {
          this.theRaceType = data.map((res: RacetypeRspon) => ({
            price: res.price,
            name: res.name,
            distance: res.distance,
          }));
        });
      });
  }

  createForm() {
    this.raceTypeForm = this.raceType.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      distance: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const raceTypeData = this.raceTypeForm.value;
    console.log(raceTypeData);

    this.raceTypeService
      .createRaceTypeByEventId(this.eventId, raceTypeData)
      .subscribe((data) => {
        this.createForm();
        this.showRaceType();
      },
      (error)=>{
        console.log(error);
      });
  }
}
