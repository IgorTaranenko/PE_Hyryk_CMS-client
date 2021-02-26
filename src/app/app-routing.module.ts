import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            {path: 'overview', component: OverviewComponent},
            {path: 'analytics', component: AnalyticsPageComponent},
            {path: 'history', component: HistoryPageComponent},
            {path: 'order', component: OrderPageComponent},
            {path: 'items', component: ItemsPageComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
