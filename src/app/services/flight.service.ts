import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly allFlightsUrl = 'http://localhost:8080/flight/all'

  private flights: Observable<Flight[]> | undefined

  constructor(private http: HttpClient) { }

  public getAllFlights(){
    this.flights = this.http.get<Flight[]>(this.allFlightsUrl, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }})
      return this.flights
  }
}
