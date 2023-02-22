import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/service/account.service';
import {TokenApi} from '../employee-module/model/dto/TokenApi';
import {EmployeeViewDTO} from '../employee-module/dto/EmployeeViewDTO';
import {Title} from '@angular/platform-browser';
import {UserService} from "../../account/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currenUser: Account;
  token: TokenApi;
  employee: EmployeeViewDTO;

  constructor(private accountService: AccountService,
              private pageTitle: Title,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  logOut() {
    // this.authService.logout();
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  getEmployee() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
        this.employee = data;
        this.ngOnInit();
      }, error => {
        console.log("erross");
      },
      () => {
        console.log(" phai chay");
      });
  }

  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }

}
