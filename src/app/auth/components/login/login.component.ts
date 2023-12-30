import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BackendErrorInterface} from "../../../shared/types/backendError.interface";
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {AuthService} from "../../services/auth.service";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/effects/selector";
import {LoginRequestInterface} from "../../type/loginRequest.interface";
import {loginAction} from "../../store/action/login.action";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: "mc-login",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive, ReactiveFormsModule],
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit{
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(): void {
    console.log(this.form.value)
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}
