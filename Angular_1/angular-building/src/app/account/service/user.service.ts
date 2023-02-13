import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Account} from "../../model/Account";
import {AccountDTO} from "../../model/dto/AccountDTO";
import {TokenApi} from "../../model/dto/TokenApi";

const API_URL = "http://localhost:8080/account";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<Account>;
  private currentUserSubject: BehaviorSubject<Account>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Account> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Account {
    return this.currentUserSubject.value;
  }

  login(accountDTO: AccountDTO): Observable<TokenApi> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<TokenApi>(`http://localhost:8080/account/login`, accountDTO);
  }
  //
  // getAccountDTO(username: string, password: string): AccountDTO {
  //   return  {
  //     username,
  //     password
  //   };
  // }

  // login(user: Account): Observable<any> {
  //   const headers = new HttpHeaders(user ? {
  //     authorization: 'Basic ' + btoa(user.username + ':' + user.password)
  //   } : {});
  //
  //   return this.http.get<any> (API_URL + "", {headers}).pipe(
  //     map(response => {
  //       if (response) {
  //         localStorage.setItem('currentUser', JSON.stringify(response));
  //         this.currentUserSubject.next(response);
  //       }
  //       return response;
  //     })
  //   );
  // }

  // logOut(): Observable<any> {
  //   return this.http.post(API_URL + "logout", {}).pipe(
  //     map(response => {
  //       localStorage.removeItem('currentUser');
  //       this.currentUserSubject.next(null);
  //     })
  //   );
  // }
  //
  // register(user: Account): Observable<any> {
  //   return this.http.post(API_URL + "registration", JSON.stringify(user),
  //     {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  // }
}
