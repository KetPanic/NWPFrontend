import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User | undefined
  public isUser: boolean
  public isAdmin: boolean

  constructor(private userService: UserService) {
    this.isUser = false
    this.isAdmin = false
   }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.getItem("username")).subscribe( (u : User) => {
      console.log(u)
      this.user = u

      if(this.user != null){
        if(this.user.userType === "USER"){
          this.isUser = true
        }else{
          this.isAdmin = true
        }
      }
      
    } )
  }

}
