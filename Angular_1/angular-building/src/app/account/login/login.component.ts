import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountModule} from '../account.module';
import {UserService} from '../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpXsrfTokenExtractor} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Account;
  errorMessage: string;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(data => {
      const temp = JSON.stringify(data);
      localStorage.setItem('token', temp);
      this.router.navigateByUrl("/home").then(r => {
      });
    }, err => {
      console.log(err);
      this.errorMessage = 'Tên tài khoản hoặc mật khẩu không chính xác.';
    });
  }
}
