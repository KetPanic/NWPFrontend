import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly allCompaniesUrl = 'http://localhost:8080/company/all'
 
  private companies: Observable<Company[]> | undefined

  constructor(private http: HttpClient) { }

  public getAllCompanies(){
    this.companies = this.http.get<Company[]>(this.allCompaniesUrl, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }})
      return this.companies
  }
}
