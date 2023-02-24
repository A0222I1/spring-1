import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Account} from '../../module/employee-module/model/Account';
import {AccountDTO} from '../../module/employee-module/model/dto/AccountDTO';
import {TokenApi} from '../../module/employee-module/model/dto/TokenApi';

const API_URL = 'http://localhost:8080/account';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  login(accountDTO: AccountDTO): Observable<TokenApi> {
    return this.http.post<TokenApi>(`http://localhost:8080/account/login`, accountDTO);
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // Kiểm tra xem token có tồn tại trong local storage không
    return localStorage.getItem('token') !== null;
  }
}
