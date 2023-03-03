import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    const checkLogin = localStorage.getItem('token');
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
    if (this.loginForm.value.username.trim() === "" && this.loginForm.value.password.trim() === "") {
      this.loginForm.controls.password.setErrors({usernameandpassword : true});
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(data => {
      const temp = JSON.stringify(data);
      localStorage.setItem('token', temp);
      this.router.navigate(['/home']).then(r => {
        location.reload();
      });
    }, err => {
        this.errorMessage = "Tài khoản hoặc mật khẩu không đúng.";
    });
  }
}
