import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeComponentComponent} from './employee-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class EmployeeModuleModule {
}
