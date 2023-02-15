import { Injectable } from '@angular/core';
import {Account} from "../../module/employee-module/model/Account";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = "http://localhost:8080/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: Account;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.headers = new HttpHeaders({
    //   authorization: 'Bearer' + this.currentUser.token,
    //   "Content-Type": "application/json; charset=UTF-8"
    // });
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "", {headers: this.headers});
  }
}
