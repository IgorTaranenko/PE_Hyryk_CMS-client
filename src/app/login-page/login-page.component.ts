import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    
    constructor(
        private readonly authService: AuthService, private readonly route: ActivatedRoute, 
        private readonly router: Router    
    ) { }
    
    loginForm: FormGroup
    distroyed$: Subscription
    
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    signIn() {
        this.loginForm.disable();

        this.distroyed$ = this.authService.login(this.loginForm.value)
            .subscribe(res => {
                console.log("Login success");
            }, error => {
                console.warn(error);
                this.loginForm.enable();
        });
    }

    ngOnDestroy() {
        if (this.distroyed$) {
            this.distroyed$.unsubscribe();
        }
    }
    
}
