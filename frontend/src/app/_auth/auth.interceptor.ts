import { HttpBackend, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { IfStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private httpClient: HttpClient;

    PATH_OF_API = "http://localhost:9001";

    constructor(private userAuthService:UserAuthService, private router:Router, private httpBackend: HttpBackend) {
        this.httpClient = new HttpClient(httpBackend);
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        if(req.headers.get("No-Auth") === "Trues") {
            return next.handle(req.clone());
        }
    
        const token = this.userAuthService.getToken();

       req = this.addToken(req,token);

       return next.handle(req).pipe(
        catchError(
        (err:any) => {
        
        console.log(err.status);
        if(err.status == 401)
          {
            this.httpClient.post(this.PATH_OF_API+"/auth/refresh",{refreshToken:this.userAuthService.getRefreshToken()}).subscribe(
                ((res: any) => {
    
                this.userAuthService.setToken(res["token"]);

                req = this.addToken(req,this.userAuthService.getToken());
                
                return next.handle(req);
    
                })           
            );
         }
        else if(err.status === 403){
            this.router.navigate(["/forbidden"]);
        }
    
        return throwError("Some thing is wrong");    
    }
        )
       );
    }

    private addToken(request:HttpRequest<any>, token:string) {
        return request.clone({
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        });
    }
}