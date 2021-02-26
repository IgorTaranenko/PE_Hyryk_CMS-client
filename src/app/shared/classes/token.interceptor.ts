import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.authService.isAuth()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.authService.getToken()
                }
            })
        }
        
        return next.handle(req).pipe(
            catchError((e: HttpErrorResponse) => this.handleAuthError(e))
        );
    }
    handleAuthError(e: HttpErrorResponse): Observable<any> {
        if (e.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    oldSession: true
                }
            });
        }
        return throwError(e)
    }
}