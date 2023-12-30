import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../../shared/types/user.Interface";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive, ReactiveFormsModule],
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authService = inject(AuthService);
  router = inject(Router);


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  onSubmit(): void {
    this.http
      .post<{ user: UserInterface }>('https://api.realworld.io/api/users', {
        user: this.form.getRawValue(),
      })
      .subscribe((response) => {
        console.log('response', response);
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      });
  }
}

