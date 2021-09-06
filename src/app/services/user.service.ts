import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly getUserByUsernameUrl = 'http://localhost:8080/user/search'
  private user: Observable<User> | undefined

  constructor(private http: HttpClient) { }

  public getUserByUsername(username:string | null){
    
    this.user = this.http.get<User>(this.getUserByUsernameUrl + "?username=" + username, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }})
    return this.user
  }

}
