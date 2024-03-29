import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService, private router:Router, private userService:UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
      if(this.userAuthService.getToken() !== null) {
        const roles = route.data["roles"] as string[];

        const userRoles: any = this.userAuthService.getRoles();

        if(userRoles.length > 1)
        {
            return true;
        }    
        else{    
       if(userRoles.length > 0 && roles.indexOf(userRoles.pop()!.toString()) > -1) {
          return true;
         }
          else {
          this.router.navigate(['/forbidden']);
          return false;
         }
       }
        
      }

      this.router.navigate(['/login']);
      return false;
  }
  
}
