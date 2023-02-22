import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = false;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
  }

  login() {
    this.isAuth = true;
  }

  logout() {
    this.isAuth = false;
  }
}
