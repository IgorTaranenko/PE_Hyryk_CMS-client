import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

import { User } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string = null;

    constructor(private http: HttpClient) { }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuth():boolean {
        if (this.token) {
            return true;
        } else {
            return false;
        }
    }

    logout(): void {
        this.setToken(null);
        localStorage.clear();
    }
    
    login(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(({token}) => {
                    localStorage.setItem('auth-token', token);
                    this.setToken(token);
                })
            )
    }
}