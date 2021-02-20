import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'sign-up', component: SignUpPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
