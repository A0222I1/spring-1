import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Employee} from "../../module/employee-module/model/Employee";
import {EmployeeViewDTO} from "../../module/employee-module/dto/EmployeeViewDTO";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  employee: EmployeeViewDTO;

  constructor(private router: Router, private toast: ToastrService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.toast.error("Đăng nhập mới có thể vào chức năng này.");
    this.router.navigate(['/login']);
    return false;
  }

}
