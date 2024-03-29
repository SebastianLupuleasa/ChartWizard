import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

export interface JwtUser {
  id: number;
  uuid: string;
  username: string;
  email: string;
  role: string[];
  enabled: boolean,
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {

  jwtUsers: JwtUser[] = [];
  jwtUsersFound: string = "";
  PATH_URL: string = "http://localhost:9001/";
  userId: number = Number(this.userAuthService.getUserId());

  constructor(private router:Router,private httpClient: HttpClient, private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.httpClient
      .get<any>(this.PATH_URL + 'users/')
      .subscribe((response) => {
        this.jwtUsers = response;
        if(this.jwtUsers.length === 0){
          this.jwtUsersFound = "No users were found!";
        }
      });
  }

  deleteUser(userId: number){
    console.log("dessert");
    this.httpClient
    .delete<any>(this.PATH_URL + 'users/delete',{params: {
      userId:Number(userId)
    }})
    .subscribe((response) => {
      this.getUsers();
      this.router.navigate(['/manage']);
    },
    (error) => {
      this.router.navigate(['/manage']);
    }
  );

  }
}
