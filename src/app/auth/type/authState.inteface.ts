import {UserInterface} from "../../shared/types/user.Interface";
import {BackendErrorInterface} from "../../shared/types/backendError.interface";


export interface AuthStateInterface {
  isSubmitting:boolean
  currentUser:UserInterface | null
  isLoggedIn: boolean | null
  validationErrors: BackendErrorInterface | null


}
