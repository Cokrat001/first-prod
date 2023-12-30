import {Component, OnInit, inject, importProvidersFrom} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/services/auth.service'
import {UserInterface} from './shared/types/user.Interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BackendErrorInterface} from "./shared/types/backendError.interface";
import {select, Store, StoreModule} from "@ngrx/store";
import {AppStateInterface} from "./shared/types/appState.interface";
import {isSubmittingSelector, validationErrorsSelector} from "./auth/store/effects/selector";
import {RegisterRequestInterface} from "./auth/type/registerRequest.interfeca";
import {registerAction} from "./auth/store/action/register.action";
import {BrowserModule} from "@angular/platform-browser";
import {routes} from "./app.routes";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: []
})
export class AppComponent {

}
