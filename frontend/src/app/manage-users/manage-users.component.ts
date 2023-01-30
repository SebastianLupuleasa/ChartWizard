import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

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

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.getChart();
  }

  getChart() {
    this.httpClient
      .get<any>(this.PATH_URL + 'users/')
      .subscribe((response) => {
        this.jwtUsers = response;
        if(this.jwtUsers.length === 0){
          this.jwtUsersFound = "No users were found!";
        }
      });
  }
}
