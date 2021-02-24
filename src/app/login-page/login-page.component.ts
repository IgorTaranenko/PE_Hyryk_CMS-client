import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';
import { MessageService } from '../shared/services/message.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    
    constructor(
        private authService: AuthService, private route: ActivatedRoute, 
        private router: Router, private messageService: MessageService,
        private loaderService: LoaderService
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
        this.loaderService.startLoading();
        this.distroyed$ = this.authService.login(this.loginForm.value)
            .subscribe(res => {
                this.loaderService.stopLoading();
                console.log("Login success");
            }, error => {
                this.loaderService.stopLoading();
                this.messageService.open(error.error.message);
                this.loginForm.enable();
        });
    }

    ngOnDestroy() {
        if (this.distroyed$) {
            this.distroyed$.unsubscribe();
        }
    }
    
}
