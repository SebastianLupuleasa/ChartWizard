import { HttpBackend, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private httpClient: HttpClient;

    private PATH_OF_API = "http://localhost:9001";

    constructor(private userAuthService:UserAuthService, private router:Router, private httpBackend: HttpBackend) {
        this.httpClient = new HttpClient(httpBackend);
    }

    private addToken(request:HttpRequest<any>, token:string) {
        return request.clone({
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        });
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
        
        console.log(err);
        if(err.status == 401 || err.status == 500)
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

        else if(err.status === 200){
                return throwError("It's fine.");    
        }   

        return throwError("Some thing is wrong");    
    }
        )
       );
    }
}