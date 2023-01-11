import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

   constructor(private userService: UserService, private router:Router) {}

   register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {
      
        if(JSON.parse(response["user"])["role"].indexOf("ROLE_ADMIN") > -1) {
          this.router.navigate(['charts']);
        } else {
          this.router.navigate(['home']);
        }
  
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
