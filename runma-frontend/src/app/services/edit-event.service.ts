import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/editEvent'
import { Organizer } from '../model/editEventOrganizer';
import { RaceType } from '../model/editEventRaceType';

@Injectable({
  providedIn: 'root'
})
export class EditEventService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public getOrganizer(): Observable<Organizer[]>{ 
    return this.httpClient.get<Organizer[]>(this.baseURL + "/organizer/");
  }

  public getOrganizerById(id: number): Observable<Organizer>{
    return this.httpClient.get<Organizer>(this.baseURL + "/organizer/" + id)
  }

  public getRaceTypeOfEvent(id: number): Observable<RaceType[]>{
    return this.httpClient.get<RaceType[]>(this.baseURL + "/event/" + id + "/raceType")
  }

  public getEventById(id:number): Observable<Event>{
    return this.httpClient.get<Event>(this.baseURL + "/event/" + id);
  }

  public updateEvent(id:number, data: Event): Observable<Object>{
    return this.httpClient.put(this.baseURL + "/event/" + id, data);
  }
}
