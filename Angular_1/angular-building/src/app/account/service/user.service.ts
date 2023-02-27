import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Account} from '../../module/employee-module/model/Account';
import {AccountDTO} from '../../module/employee-module/model/dto/AccountDTO';
import {TokenApi} from '../../module/employee-module/model/dto/TokenApi';
import {AccountService} from './account.service';

const API_URL = 'http://localhost:8080/account';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private nameEmployee: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private token: TokenApi;
  private employee: string;

  constructor(private http: HttpClient,
              private accountService: AccountService,
  ) {
  }

  login(accountDTO: AccountDTO): Observable<TokenApi> {
    return this.http.post<TokenApi>(`http://localhost:8080/account/login`, accountDTO);
  }

  logOut() {
    localStorage.removeItem('token');
  }

  getEmployee() {
    if (this.checkIsLoggedInWithToken()) {
      this.token = JSON.parse(localStorage.getItem('token'));
      this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
          this.employee = data.name;
          this.setEmployeeName(this.employee);
        }, error => {
          console.log('errors');
        },
        () => {
        });
    } else {
      console.log('please login');
    }
  }

  checkIsLoggedInWithToken() {
    // Kiểm tra xem token có tồn tại trong local storage không
    return localStorage.getItem('token') !== null;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setEmployeeName(name: string) {
    this.nameEmployee.next(name);
  }

  get employeeName() {
    return this.nameEmployee.asObservable();
  }
}
