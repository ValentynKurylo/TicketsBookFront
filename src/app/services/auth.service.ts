import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationModel} from "../models/registration.model";
import {LoginModel} from "../models/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000"

  constructor(private httpClint: HttpClient) { }

  registration(body: RegistrationModel): Observable<any>{
    return this.httpClint.post<any>(this.url + '/auth/registration', body)
  }

  login(body: LoginModel){
    return this.httpClint.post<any>(this.url + '/auth/login', body)
  }
}
