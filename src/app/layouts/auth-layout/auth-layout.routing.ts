import { Routes } from '@angular/router';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'landing',       component: LandingComponent },
    { path: 'signup',       component: SignupComponent }
];
