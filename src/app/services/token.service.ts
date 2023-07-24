import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string | null | any = null;
  private user: UserModel | null = null;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  getUser(): UserModel | null {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }


}
