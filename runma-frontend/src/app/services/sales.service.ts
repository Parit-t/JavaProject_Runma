import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventInfo } from '../model/event-info';


@Injectable({
  providedIn: 'root'
})
export class SalesService {


  private getUrl: string = "http://localhost:8080/event/detail";
  constructor(private _httpClient: HttpClient) { }

  getSalesEventInfo(eventId: number): Observable<EventInfo> {
    return this._httpClient.get<EventInfo>(this.getUrl+'/'+eventId);
  }
  }

