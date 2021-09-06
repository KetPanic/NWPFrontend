import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators'
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl = 'http://localhost:8080/auth/login'

  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post<Credentials>(this.loginUrl, {
        username: credentials.username,
        password: credentials.password
    }).pipe(map( (responseData : Credentials) => {
      localStorage.setItem("username", credentials.username)
      localStorage.setItem("jwt", responseData.jwt)
    }))
  }
  
  logout(){
    localStorage.removeItem("jwt")
    localStorage.removeItem("username")
  }
  
}
