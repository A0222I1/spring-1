import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/service/account.service';
import {TokenApi} from '../employee-module/model/dto/TokenApi';
import {EmployeeViewDTO} from '../employee-module/dto/EmployeeViewDTO';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public token: TokenApi;
  employee: EmployeeViewDTO;

  constructor(private accountService: AccountService,
              private pageTitle: Title) {
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
      this.employee = data;
    });
  }

  getEmployee() {
  }

  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }


  // public isLogged(): boolean {
  //   return !(window.sessionStorage.getItem("token") == null && window.localStorage.getItem("token") == null);
  // }
}
