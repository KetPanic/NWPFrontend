import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public isError: boolean
  public errorMessage: String

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.isError = false
    this.errorMessage = ""
   }

  ngOnInit(): void {
  }

  public get username(){
    return this.loginForm.get('username')
  }

  public get password(){
    return this.loginForm.get('password')
  }

  public submitForm(credentials){
    this.authService.login(credentials).subscribe(data => {
      this.router.navigate(['/home'])
    },
    (error: HttpErrorResponse) => {
      console.log(error.error.message)
      this.isError = true
      this.errorMessage = error.error.message
    });
  }

  public enterSubmit(event, credentials){
    if(event.keyCode === 13){
      if(!this.username?.errors && !this.password?.errors){
        this.submitForm(credentials)
      }
    }
  }

}
