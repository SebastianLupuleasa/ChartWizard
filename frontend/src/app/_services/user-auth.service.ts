import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public clear(){
    localStorage.clear();
  }

  public getFullscreen(): string {
    return localStorage.getItem("fullscreenChart")!;
  }

  public getRefreshToken() {
    return localStorage.getItem("jwtRefreshToken")!;
  }

  public getRoles() : [] {
    return JSON.parse(localStorage.getItem("roles")!);
  }

  public getToken(): string {
    return localStorage.getItem("jwtToken")!;
  }

  public getUserId(): string {
    return localStorage.getItem("userId")!;
  }

  public getUsername(): string {
    return localStorage.getItem("username")!;
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public setRefreshToken(jwtToken:string) {
    localStorage.setItem("jwtRefreshToken", jwtToken);
  }

  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public setToken(jwtToken:string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public setUserId(userId:string) {
    localStorage.setItem("userId", userId);
  }

  public setUsername(username:string) {
    localStorage.setItem("username", username);
  }
}
