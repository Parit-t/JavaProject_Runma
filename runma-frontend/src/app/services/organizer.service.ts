import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Organizer } from '../model/organizer';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  private baseURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  newOrganizer(organizer:Organizer): Observable<Organizer>{
    // return this.httpClient.post<Organizer>(`${environment.apiHost}/organizer`, organizer);
    return this.httpClient.post<Organizer>(`${this.baseURL}/organizer/`, organizer);
    // return this.httpClient.post<Organizer>(`/api/organizer`, organizer);
  }
}
