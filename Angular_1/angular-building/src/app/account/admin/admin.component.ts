import { Component, OnInit } from '@angular/core';
import {AccountService} from "../service/account.service";
import {Router} from "@angular/router";
import {Account} from "../../model/Account";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Account[] = [];

  constructor(private adminService: AccountService, private router: Router) { }

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
      console.log(this.userList);
    });
  }

  detail(user: Account) {
    localStorage.setItem("detailUser", JSON.stringify(user));
    this.router.navigate(['/detail', user.username]);
  }
}
