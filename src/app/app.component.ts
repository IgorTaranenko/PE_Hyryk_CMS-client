import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LoaderService } from './shared/services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isLoading
    constructor(private authService: AuthService, private loaderService: LoaderService) {}

    ngOnInit() {
        this.loaderService.isLoadingGlobal.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        const potentialToken = localStorage.getItem('auth-token');
        if (potentialToken !== null) {
            this.authService.setToken(potentialToken);
        }
    }

}
