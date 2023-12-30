import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "../type/registerRequest.interfeca";
import {map, Observable} from "rxjs";
import {UserInterface} from "../../shared/types/user.Interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";
import {AuthResponseInterface} from "../type/authResponse.inteface";
import {LoginRequestInterface} from "../type/loginRequest.interface";


@Injectable({ providedIn: 'root' })
export class AuthService{
  constructor(private http: HttpClient) {}

  getUser(response:AuthResponseInterface): UserInterface{
    return response.user
  }
  register(data: RegisterRequestInterface): Observable<UserInterface> {
    const url = environment.apiUrl + '/users'

    return  this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
  login(data: LoginRequestInterface): Observable<UserInterface>{
    const url = environment.apiUrl + '/users/login'

    return  this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
}
