import { Injectable, signal } from '@angular/core';
import { UserInterface } from "../../shared/types/user.Interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
}
