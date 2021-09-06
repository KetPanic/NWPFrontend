import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User | undefined
  public isUser: boolean
  public username: string | null
  public bookingCount: number
  public userType: string

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.isUser = false
    this.username = localStorage.getItem("username")
    this.bookingCount = 0
    this.userType = ""
   }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.getItem("username")).subscribe( (u : User) => {
      console.log(u)
      this.user = u

      if(this.user != null){
        if(this.user.userType === "USER"){
          this.isUser = true
        }

        this.bookingCount = this.user.bookings.length

        this.userType = this.user.userType

      }
      
    } )
  }

  logout():void{
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
