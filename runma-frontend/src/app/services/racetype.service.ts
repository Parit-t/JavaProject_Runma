import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RacetypeRspon } from '../model/racetype';

@Injectable({
  providedIn: 'root',
})
export class RacetypeService {
  apiUrl: string = 'http://localhost:8080/raceType';

  constructor(public http: HttpClient) {}

  searchByEventId(eventId: number) {
    return this.http.get<RacetypeRspon[]>(this.apiUrl + '/' + eventId);
  }

  createRaceTypeByEventId(eventId: number, form: RacetypeRspon) {
    return this.http.post<RacetypeRspon>(
      this.apiUrl + '/createRaceType' + '/' + eventId,
      form
    );
  }
}
