import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {BackendErrorInterface} from "../../../shared/types/backendError.interface";
import {select, Store, StoreModule} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/effects/selector";
import {RegisterRequestInterface} from "../../type/registerRequest.interfeca";
import {registerAction} from "../../store/action/register.action";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'mc-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  standalone: true,
  providers: [AuthService, PersistanceService]
})
export class RegisterComponent implements OnInit{
  form: FormGroup = new FormGroup({})
  isSubmitting$: Observable<boolean> = new Observable<boolean>()
  backendErrors$:Observable<BackendErrorInterface | null> = new Observable<BackendErrorInterface | null>()

  constructor(private fb: FormBuilder, private store: Store<AppStateInterface>,private authService:AuthService) {}

  ngOnInit() {
    this.initializeForm()
    this.initializeValues()
  }
  initializeValues():void{
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(): void {
    console.log(this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }



}

