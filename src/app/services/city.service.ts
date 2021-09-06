import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly allCitiesUrl = 'http://localhost:8080/city/all'
  
  private cities: Observable<City[]> | undefined

  constructor(private http: HttpClient) { }

  public getAllCities(){
    this.cities = this.http.get<City[]>(this.allCitiesUrl, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }})
      return this.cities
  }
}
