import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketRequest, TicketResponse } from '../model/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl: string = 'http://localhost:8080/ticket';

  constructor(public http: HttpClient) {}

  getTicket(ticketId: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(this.apiUrl + '/' + ticketId);
  }

  addPayment(ticketId: number, form: TicketRequest): Observable<TicketRequest> {
    return this.http.put<TicketRequest>(this.apiUrl + '/' + ticketId, form);
  }
}