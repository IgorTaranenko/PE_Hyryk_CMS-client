import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { CategoryComponent } from './components/category/category.component';
import { PositionComponent } from './components/position/position.component';
import { ConfirmDeleteComponent } from './shared/components/confirm-delete/confirm-delete.component';
import { AddOrEditPositionComponent } from './shared/components/add-or-edit-position/add-or-edit-position.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        AuthLayoutComponent,
        SiteLayoutComponent,
        LoaderComponent,
        OverviewComponent,
        AnalyticsPageComponent,
        HistoryPageComponent,
        OrderPageComponent,
        ItemsPageComponent,
        CategoryComponent,
        PositionComponent,
        ConfirmDeleteComponent,
        AddOrEditPositionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
