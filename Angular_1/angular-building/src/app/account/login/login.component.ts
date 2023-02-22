import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountModule} from "../account.module";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpXsrfTokenExtractor} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

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
    var checkLogin = localStorage.getItem('token');
    if (checkLogin) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  login() {
    if(this.loginForm.value.username.trim() == "" && this.loginForm.value.password.trim() == ""){
      this.loginForm.controls.password.setErrors({usernameandpassword : true});
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(data => {
      const temp = JSON.stringify(data);
      localStorage.setItem('token', temp);
      this.router.navigate(['/home']).then(r => {
        console.log(this.loginForm);
      });
    }, err => {
        this.errorMessage = "Tài khoản hoặc mật khẩu không đúng.";
    });
  }
}
