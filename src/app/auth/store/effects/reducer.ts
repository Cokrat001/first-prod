import {AuthStateInterface} from "../../type/authState.inteface";
import {Action, createReducer, on} from "@ngrx/store";
import {registerAction, registerFailureAction, registerSuccessAction} from "../action/register.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "../action/login.action";


const initialState: AuthStateInterface={
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}

const  authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface=>({
      ...state,
      isSubmitting:true,
      validationErrors:null
    })
  ),on(
    registerSuccessAction,
    (state,action): AuthStateInterface=>({
      ...state,
      isSubmitting:false,
      isLoggedIn:true,
      currentUser:action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state,action): AuthStateInterface=>({
      ...state,
      isSubmitting:false,
      validationErrors:action.errors
    })
  ),
  on(
    loginAction,
    (state):AuthStateInterface=>({
      ...state,
      isSubmitting:true,
      validationErrors:null
    })
  ),
  on(
    loginSuccessAction,
    (state ,action):AuthStateInterface=>({
      ...state,
      isSubmitting:false,
      isLoggedIn:true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state ,action):AuthStateInterface=>({
      ...state,
      isSubmitting:false,
      validationErrors: action.errors
    })
  )

)

export default authReducer;
 //export function reducers(state:AuthStateInterface, action:Action){
 //  return authReducer(state, action)
// }
