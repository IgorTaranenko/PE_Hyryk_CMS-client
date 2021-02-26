import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.less']
})
export class SiteLayoutComponent implements OnInit {
    links: Object[] = [
        {url: 'overview', name: 'Обзор'},
        {url: 'analytics', name: 'Аналитика'},
        {url: 'history', name: 'История'},
        {url: 'order', name: 'Добавить заказ'},
        {url: 'items', name: 'Ассортимент'},
    ]
    constructor(
        private router: Router, private authService: AuthService,
        public loaderService: LoaderService
    ) { }

    ngOnInit(): void {
    }

    logout(event: Event):void {
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
