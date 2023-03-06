import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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
  private maxRole: BehaviorSubject<number> = new BehaviorSubject<number>(2);
  private token: TokenApi;
  private maxRoleSub: number;
  private nameEmployeeSub: string;

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

  getNameEmployee() {
    if (this.checkIsLoggedInWithToken()) {
      this.token = JSON.parse(localStorage.getItem('token'));
      this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
          this.nameEmployeeSub = data.name;
          this.setEmployeeName(this.nameEmployeeSub);
        }, error => {
          console.log('errors');
        },
        () => {
        });
    } else {
      console.log('please login');
    }
  }

  getRole() {
    if (this.checkIsLoggedInWithToken()) {
      this.token = JSON.parse(localStorage.getItem('token'));
      this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
          this.maxRoleSub = data.maxRole;
          this.setRole(this.maxRoleSub);
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

  setRole(num: number) {
    this.maxRole.next(num);
  }

  get role() {
    return this.maxRole.asObservable();
  }
}
