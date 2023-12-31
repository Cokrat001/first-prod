import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../action/register.action";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {UserInterface} from "../../../shared/types/user.Interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {PersistanceService} from "../../../shared/services/persistance.service";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: UserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token)
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(registerFailureAction({errors: errorResponse.error.errors}))
        }))
    })
  ))

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
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
