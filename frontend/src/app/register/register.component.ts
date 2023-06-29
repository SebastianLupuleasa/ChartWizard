import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterErrorComponent } from '../register-error/register-error.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

   constructor(private userService: UserService, private router:Router,private dialog: MatDialog) {}

   register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      () => {      
        this.router.navigate(['login']);
       },
      (error) => {
             
        if(error.status !== 200){
          this.dialog.open(RegisterErrorComponent);
            }

          this.router.navigate(['login']);
      }
    );
  }


}
