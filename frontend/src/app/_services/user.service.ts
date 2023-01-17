import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   PATH_OF_API = "http://localhost:9001";

  requestHeader = new HttpHeaders({"No-Auth":"True"});

  private httpClient: HttpClient;

  constructor(private httpclient: HttpClient, private userAuthService:UserAuthService, private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/login", loginData, {headers: this.requestHeader});
  }

  public register(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/auth/register", registerData, {headers: this.requestHeader});
  }

  public roleMatch(allowedRoles: string): boolean {
    const userRoles: any = this.userAuthService.getRoles();

    //TODOs

   if(userRoles.indexOf(allowedRoles) > -1) {
    return true;
   }
   return false;
      
  }

}
