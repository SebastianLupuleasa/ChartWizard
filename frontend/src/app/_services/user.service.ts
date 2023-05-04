import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient;
   private PATH_OF_API = "http://localhost:9001";

  private requestHeader = new HttpHeaders({"No-Auth":"True"});
  constructor(private httpclient: HttpClient, private userAuthService:UserAuthService, private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/login", loginData, {headers: this.requestHeader});
  }

  public register(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/auth/register", registerData, {headers: this.requestHeader});
  }

}
