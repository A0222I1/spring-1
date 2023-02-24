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

  constructor(private accountService: AccountService,
              private pageTitle: Title,
              private userService: UserService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.getEmployee();
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  onLogOut() {
    this.userService.logOut();
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }

  getEmployee() {
    if (this.userService.isLoggedIn()) {
      this.token = JSON.parse(localStorage.getItem('token'));
      this.accountService.parseTokenToEmployee(this.token.token).subscribe(data => {
          this.employee = data;
        }, error => {
          console.log('errors');
        },
        () => {
        });
    } else {
      console.log('please login');
    }
  }


  setPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
}
