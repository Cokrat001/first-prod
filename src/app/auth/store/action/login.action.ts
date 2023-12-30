import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../effects/action.Types";
import {LoginRequestInterface} from "../../type/loginRequest.interface";
import {BackendErrorInterface} from "../../../shared/types/backendError.interface";
import {UserInterface} from "../../../shared/types/user.Interface";

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: UserInterface}>()
)
export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorInterface}>()
)
