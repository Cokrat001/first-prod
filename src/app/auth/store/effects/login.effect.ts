import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginAction, loginFailureAction, loginSuccessAction} from "../action/login.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {UserInterface} from "../../../shared/types/user.Interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {Router} from "@angular/router";

@Injectable()

export class LoginEffect {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) => {
      return this.authService.login(request).pipe(
        map((currentUser: UserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token)
          return loginSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction({errors: errorResponse.error.errors}))
        }))
    })
  ))

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          console.log('succ')
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false})

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
