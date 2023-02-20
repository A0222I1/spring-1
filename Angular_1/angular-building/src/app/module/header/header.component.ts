import { Component, OnInit } from '@angular/core';
import {UserService} from "../../account/service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../account/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currenUser: Account;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    this.currenUser =JSON.parse(localStorage.getItem('token'))
  }

  ngOnInit(): void {
    // if (!this.currenUser) {
    //   this.router.navigate(['/login']);
    // }
  }

  logOut() {
    this.authService.logout();
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
