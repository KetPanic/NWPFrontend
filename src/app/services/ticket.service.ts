import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly allTicketsUrl = 'http://localhost:8080/ticket/all'
  private readonly deleteTicketUrl = 'http://localhost:8080/ticket/'
  private tickets: Observable<Ticket[]> | undefined

  constructor(private http: HttpClient) { }

  public getAllTickets(){
    this.tickets = this.http.get<Ticket[]>(this.allTicketsUrl, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }})
      return this.tickets
  }

  public deleteTicket(id){
    console.log("BRUH")
    return this.http.delete(`http://localhost:8080/ticket/${id}`, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
    }})
  }

}
