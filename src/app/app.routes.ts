import { Routes } from '@angular/router';
import {RegisterComponent} from "./auth/components/register/register.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/components/login/login.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path:'login', component:LoginComponent}
];
