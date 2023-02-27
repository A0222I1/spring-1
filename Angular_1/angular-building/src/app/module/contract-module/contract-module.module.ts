import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ContractComponentComponent } from './contract-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponentComponent} from "../employee-module/employee-component.component";
import {FormatNumberPipe} from './utils/FormatNumberPipe';
import {AppModule} from '../../app.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from "../../account/guard/auth.guard";
import {LoginComponent} from "../../account/login/login.component";

const routes: Routes = [
  {
    path: 'contract', component: ContractComponentComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [ContractComponentComponent,
    FormatNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ContractModuleModule {
}
