import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeComponentComponent} from './employee-component.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeCurrencyCustomPipe} from "./utils/PipeCurrencyCustom";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponentComponent
  }
];

@NgModule({
  declarations: [EmployeeComponentComponent, PipeCurrencyCustomPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // required animations module
    // ToastrModule added
  ]
})
export class EmployeeModuleModule {
}
