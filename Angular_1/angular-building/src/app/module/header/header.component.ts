import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/service/account.service';
import {TokenApi} from '../employee-module/model/dto/TokenApi';
import {EmployeeViewDTO} from '../employee-module/dto/EmployeeViewDTO';
import {Title} from '@angular/platform-browser';
import {UserService} from "../../account/service/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currenUser: Account;
  token: TokenApi;
  employee: EmployeeViewDTO;
  temp = undefined;

  constructor(private accountService: AccountService,
              private pageTitle: Title,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginByUser();
    this.getEmployee();
  }

  checkToken() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  loginByUser(): boolean {
    if (this.employee) {
      this.temp = this.employee.maxRole;
    }
    return this.temp === 1;
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }

  getEmployee() {
    console.log(1);
    this.token = JSON.parse(localStorage.getItem('token'));
    this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
      this.employee = data;
    });
  }

  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
