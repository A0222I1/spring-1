import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  isLoad = false;
  constructor(private accountService: AccountService,
              private cdf: ChangeDetectorRef,
              private pageTitle: Title) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.getEmployee();
    }
  }
  getEmployee() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.accountService.parseTokenToEmployee(this.token.token).then(data => {
      this.employee = data;
      this.isLoad = true;
      this.cdf.detectChanges();
    });
  }
  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
