import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles() : [] {
    return JSON.parse(localStorage.getItem("roles")!);
  }

  public setToken(jwtToken:string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public setUsername(username:string) {
    localStorage.setItem("username", username);
  }

  public getUsername(): string {
    return localStorage.getItem("username")!;
  }

  public setUserId(userId:string) {
    localStorage.setItem("userId", userId);
  }

  public getUserId(): string {
    return localStorage.getItem("userId")!;
  }


  public getToken(): string {
    return localStorage.getItem("jwtToken")!;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }


}
