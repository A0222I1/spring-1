import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeComponentComponent} from './employee-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PipeCurrencyCustomPipe} from "./utils/PipeCurrencyCustom";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "../../account/guard/auth.guard";
import {Role} from "./model/Role";

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponentComponent, canActivate: [AuthGuard],
    data: {
      title: "Quản lý nhân viên",
      roles: [Role.ADMIN]
    }
  }
];

@NgModule({
  declarations: [EmployeeComponentComponent, PipeCurrencyCustomPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class EmployeeModuleModule {
}
