import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketRequest } from '../model/ticket-request';
import { ViewTicket } from '../model/view-ticket';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/ticket';

  create(req: TicketRequest) {
    console.log('in service create Ticket');

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post<TicketRequest>(`${this.url}/`, req, { headers: headers })
      .subscribe(
        (data) => console.log('create Ticket Succesfully!!') ,
        (error)=> console.log(error));
  }

  getAllUserTicket(id:number):Observable<ViewTicket[]>{
    return this.http.get<ViewTicket[]>(`${this.url}/user/${id}`).pipe(
      map(res=>{
        return res.map(viewTic=>{
          // console.log(viewTic)
          return{
            id:viewTic.id,
            status:viewTic.status,
            createDate:new Date(viewTic.createDate),
            paidDate:viewTic.paidDate ? new Date(viewTic.paidDate):null,
            raceType:{
              name:viewTic.raceType.name,
              distance: viewTic.raceType.distance,
              price: viewTic.raceType.price,
              event: {
                name: viewTic.raceType.event.name,
                province: viewTic.raceType.event.province,
                location: viewTic.raceType.event.location,
              }
            }
          }
        })
      })
    )
  }

  groupTicketByStatus(ticketList: ViewTicket[]): {[status: string]: ViewTicket[]} {
    const groupTicket: {[status: string]: ViewTicket[]} = {};
    for (const ticket of ticketList) {
      if (!groupTicket[ticket.status]) {
        groupTicket[ticket.status] = [];
      }
      groupTicket[ticket.status].push(ticket);
    }
    return groupTicket;
  }
}
