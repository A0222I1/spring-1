import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from './customer-management.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AuthGuard} from "../../account/guard/auth.guard";


const routes: Routes = [
  {
    path: 'customer', component: CustomerManagementComponent, canActivate: [AuthGuard],
    data: {
      title: "Quản lý khách hàng"
    }
  }
];

@NgModule({
  declarations: [CustomerManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class CustomerModuleModule { }
