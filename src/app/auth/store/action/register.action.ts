import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../effects/action.Types";
import {RegisterRequestInterface} from "../../type/registerRequest.interfeca";
import {UserInterface} from "../../../shared/types/user.Interface";
import {BackendErrorInterface} from "../../../shared/types/backendError.interface";


export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: UserInterface}>()
)

export const registerFailureAction = createAction(ActionTypes.REGISTER_FAILURE, props<{errors:BackendErrorInterface}>())
