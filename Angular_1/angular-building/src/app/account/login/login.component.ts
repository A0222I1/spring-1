import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Account;
  errorMessage: string;
  loginForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit() {
    if (this.userService.checkIsLoggedInWithToken()) {
      this.router.navigate(['/home']).then(r => {
        this.toast.warning('Bạn đang đăng nhập !!');
      });
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }


  login() {
    if (this.loginForm.value.username.trim() === '' && this.loginForm.value.password.trim() === '') {
      this.loginForm.controls.password.setErrors({userNameAndPassword: true});
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(data => {
      const temp = JSON.stringify(data);
      localStorage.setItem('token', temp);
      this.router.navigate(['/home']).then(r => {
        this.userService.getEmployee();
        this.userService.setLoggedIn(true);
        this.toast.success('Đăng nhập thành công');
      });
    }, err => {
      if (!this.loginForm.value) {
        this.errorMessage = 'Tài khoản và mật khẩu không chính xác.';
      }
    });
  }
}
