import {Component, Injectable, OnInit} from '@angular/core';
import {AccountService} from '../../account/service/account.service';
import {TokenApi} from '../employee-module/model/dto/TokenApi';
import {EmployeeViewDTO} from '../employee-module/dto/EmployeeViewDTO';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../account/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HeaderComponent implements OnInit {
  token: TokenApi;
  employee: EmployeeViewDTO;
  isLoggedIn: boolean;
  employeeName: string;

  constructor(private accountService: AccountService,
              private pageTitle: Title,
              private userService: UserService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    });
    if (!this.isLoggedIn === this.userService.checkIsLoggedInWithToken()) {
      this.isLoggedIn = true;
    }
    this.userService.employeeName.subscribe(data => {
      this.employeeName = data;
    });
    if (this.employeeName === '' && this.userService.checkIsLoggedInWithToken()) {
      this.userService.getEmployee();
    }
  }

  onLogOut() {
    this.userService.logOut();
    this.router.navigate(['/login']).then(() => {
      this.userService.setLoggedIn(false);
      location.reload();
    });
  }


  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
