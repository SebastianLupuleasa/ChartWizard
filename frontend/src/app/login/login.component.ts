import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { LoginErrorComponent } from '../login-error/login-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

constructor (private userService: UserService, private dialog: MatDialog,private userAuthService:UserAuthService, private router:Router) {
}

ngOnInit(): void {
  }

login(loginForm: NgForm) {
  this.userService.login(loginForm.value).subscribe(
    (response: any) => {
      this.userAuthService.setRoles(JSON.parse(response["user"])["role"]);
      this.userAuthService.setToken(response["token"]);
      this.userAuthService.setRefreshToken(response["refreshToken"]);

      this.userAuthService.setUsername(JSON.parse(response["user"])["username"]);
      this.userAuthService.setUserId(JSON.parse(response["user"])["id"]);
  
     this.router.navigate(['']);

    },
    (error) => {
      this.dialog.open(LoginErrorComponent);
    }
  );
}
}
