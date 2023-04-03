import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Event } from '../model/event';
import { EventInterface } from '../model/eventInterface';
import { RunEvent } from '../model/run-event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  cachedEvent!: RunEvent;
  private baseURL = 'http://localhost:8080/event';
  private eventSubject = new BehaviorSubject<RunEvent>({
    id: 0,
    name: '',
    raceDate: new Date(),
    openRegisDate: new Date(),
    closeRegisDate: new Date(),
    location: '',
    province: '',
    capacity: 0,
    raceTypeList: [],
  });

  constructor(private httpClient: HttpClient) {}

  createEvent(event: Event, id: number): Observable<Object> {
    //return this.httpClient.post(`${this.baseURL}/${id}`, event);
    return this.httpClient.post(`${this.baseURL}/`, event);
  }

  getEventById$(id: number): Observable<RunEvent> {
    this.cachedEvent = this.eventSubject.value;
    if (this.cachedEvent.id == id) {
      //CACHE EXIST
      return this.eventSubject.asObservable();
    } else {
      return this.httpClient.get<RunEvent>(`${this.baseURL}/${id}`).pipe(
        tap((event) => {
          this.eventSubject.next(event);
          //NO CACHE
        })
      );
    }
  }
  public getAllEvent(): Observable<EventInterface[]> {
    return this.httpClient.get<EventInterface[]>(`${this.baseURL}/admin/`);
  }
  public getOrgEvent(id:number): Observable<EventInterface[]> {
    return this.httpClient.get<EventInterface[]>(`${this.baseURL}/organizer/${id}`);
  }

}
