import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponentComponent } from './contract-component.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponentComponent} from "../employee-module/employee-component.component";

const routes: Routes = [
  {
    path: "contract", component: ContractComponentComponent
  }
]

@NgModule({
  declarations: [ContractComponentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ContractModuleModule { }
