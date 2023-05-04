import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtUser } from '../manage-users/manage-users.component';
import { UserEditedSuccessComponent } from '../user-edited-success/user-edited-success.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userForm!: FormGroup;
  editedUser!: JwtUser;

  headers = { 'content-type': 'application/json'};
  PATH_OF_API = "http://localhost:9001";

  constructor(private router: Router,private fb: FormBuilder,private userAuthService:UserAuthService, private httpclient: HttpClient, public dialog: MatDialog,public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(()=> {
      this.editedUser = window.history.state;
    });

    let enabledString: string;

    if(this.editedUser.enabled)
    {
      enabledString = 'true';
    }
    else {
      enabledString = 'false';
    }

    let adminString: string;

    if(this.editedUser.role !== undefined && this.editedUser.role.indexOf("ROLE_ADMIN") !== -1) {
      adminString = "Admin";
    }
    else {
      adminString = "User";
    }


    this.userForm = this.fb.group({
      username: [this.editedUser.username],
      email: [this.editedUser.email],
      role: [adminString],
      enabled: [enabledString]  
    });
  }

  editUser(){
    console.log("succes");

    this.httpclient.post(this.PATH_OF_API + "/users/edit",{id:this.editedUser.id, email:this.userForm.getRawValue()["email"],username:this.userForm.getRawValue()["username"],enabled:this.userForm.getRawValue()["enabled"],role:this.userForm.getRawValue()["role"]},{'headers':this.headers}).subscribe((res) => {

      this.dialog.open(UserEditedSuccessComponent);
      this.router.navigate(['manage']);
  
   });

  }

}
