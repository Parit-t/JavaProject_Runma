import { RacetypeService } from './../../../services/racetype.service';
import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-racetype',
  templateUrl: './get-racetype.component.html',
  styleUrls: ['./get-racetype.component.css'],
})
export class GetRacetypeComponent {
  @Input() eventId!: number;
  @Input() theRaceType: any[] = [];

  constructor() {}
}
